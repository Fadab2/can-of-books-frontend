import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BestBooks from './BestBooks'
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
    if (email === this.props.auth0.user.email) { this.setState({ form: true, id }); }
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
    let email = this.props.auth0.user.email
    let newBook = { title, description, status, email }
    let url = `${process.env.REACT_APP_SERVER_URL}/books`;
    let res = await axios.post(url, newBook);
    this.setState({ books: [...this.state.books, res.data] });
  }


  deleteBooks = async (book) => {
    if (book.email === this.props.auth0.user.email) {
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
    let book = { title, description, status, email: this.props.auth0.user.email}
    const url = `${process.env.REACT_APP_SERVER_URL}/books/${id}`;
    let updatedBook = await axios.put(url, book);
    let filteredBooks = this.state.books.filter(book => book._id !== id);
    filteredBooks.push(updatedBook.data)
    this.setState({ books: filteredBooks });

  }

  getBooks = async () => {
    if (this.props.auth0.isAuthenticated) {

      const res = await this.props.auth0.getIdTokenClaims();

      const jwt = res.__raw;

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/books'
      }

      const booksResponse = await axios(config);

      this.setState({ books: booksResponse.data });
      console.log(this.state.books)
    }
  }


  render() {
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */
                this.props.auth0.user && <BestBooks getBooks={this.getBooks} openForm={this.openForm} deleteBooks={this.deleteBooks} books={this.state.books} newBook={this.state.newBook} openModal={this.openModal} /> 
              }
              <BookFromModal setStateOfFrom={this.setStateOfFrom} closeModal={this.closeModal} openModal={this.openModal} show={this.state.show} />
              <BookUpdateFormModal updateBooks={this.updateBooks} closeForm={this.closeForm} form={this.state.form}></BookUpdateFormModal>
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);




