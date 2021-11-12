import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BestBooks from './BestBooks'
import Login from './Login'
import Profile from './Profile'
import axios from 'axios';
import BookFromModal from './BookFromModal';
import BookUpdateFormModal from './BookUpdateFormModal'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      show: false,
      books: [],
      form: false,

    }
  }

  closeModal = () => {
    this.setState({ show: false });
  };

  openModal = () => {
    this.setState({ show: true });

  };
  closeForm = () => {
    this.setState({ form: false });
  };

  openForm = (id, email) => {
    if (email === this.state.user) { this.setState({ form: true, id }); }
    else { alert("You can only update your own books.") }

  };
  loginHandler = (user) => {
    this.setState({
      user,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  setStateOfFrom = async (title, description, stat) => {
    let status = (stat === 'true')
    let email = this.state.user
    let newBook = { title, description, status, email }
    let url = `${process.env.REACT_APP_SERVER_URL}/books`;
    let res = await axios.post(url, newBook);
    this.setState({ books: [...this.state.books, res.data] });
  }


  deleteBooks = async (book) => {
    if (book.email === this.state.user) {
      let id = book._id
      const url = `${process.env.REACT_APP_SERVER_URL}/books/${id}`;
      await axios.delete(url);
      let filteredBooks = this.state.books.filter(book => book._id !== id);
      this.setState({ books: filteredBooks });
    } else { alert("You can only delete your own books.") }
  }
  updateBooks = async (title, description, stat) => {
    let status = (stat === 'true')
    let id = this.state.id
    let book = { title, description, status, email: this.state.user }
    const url = `${process.env.REACT_APP_SERVER_URL}/books/${id}`;
    let updatedBook = await axios.put(url, book);
    let filteredBooks = this.state.books.filter(book => book._id !== id);
    filteredBooks.push(updatedBook.data)
    this.setState({ books: filteredBooks });

  }

  async componentDidMount() {
    let booksFromServer = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books`);
    this.setState({ books: booksFromServer.data });
  }
  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */
                this.state.user ? <BestBooks openForm={this.openForm} email={this.state.user} deleteBooks={this.deleteBooks} books={this.state.books} newBook={this.state.newBook} openModal={this.openModal} /> : <Login loginHandler={this.loginHandler} />
              }
              <BookFromModal setStateOfFrom={this.setStateOfFrom} closeModal={this.closeModal} openModal={this.openModal} show={this.state.show} />
              <BookUpdateFormModal updateBooks={this.updateBooks} closeForm={this.closeForm} form={this.state.form}></BookUpdateFormModal>
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route path="/profile">
              <Profile user={this.state.user} />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;




