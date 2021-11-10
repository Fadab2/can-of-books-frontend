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

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      show: false,
      books: []
    }
  }
  //done in class: add books
  // postBooks = async (bookObj) => {
  //   const url = `${SERVER}/books`
  //   let res = await axios.post(url, bookObj)
  //   this.setState({ book: [...this.books, res.data]});
  // }

  //delete books
  //deleteBooks = async (id) => {
  //   const url = `${SERVER}/books/${id}`
  //    await axios.delete(url)
  // let filterBooks = 
  //   this.setState({ book: [...this.books, res.data]});
  // }


  closeModal = () => {
    this.setState({ show: false });
  };

  openModal = () => {
    this.setState({ show: true });
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

  setStateOfFrom = async (title, description, status) => {
    let email = this.state.user
    let temp = { title, description, status, email }
    console.log(temp)
    let url = `${process.env.REACT_APP_SERVER_URL}/books`
    let res = await axios.post(url, temp);
    console.log(url, temp)
    this.setState({ books: [...this.state.books, res.data] });
  }

  async componentDidMount() {
    let booksFromServer = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books`);
    this.setState({ books: booksFromServer.data });
    console.log(booksFromServer)
    console.log('running')
  }

  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */
                this.state.user ? <BestBooks books={this.state.books} newBook={this.state.newBook} openModal={this.openModal} /> : <Login loginHandler={this.loginHandler} />
              }
              <BookFromModal setStateOfFrom={this.setStateOfFrom} closeModal={this.closeModal} openModal={this.openModal} show={this.state.show} />
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
