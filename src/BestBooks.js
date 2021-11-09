import React from 'react';
import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  async componentDidMount() {
    let booksFromServer = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books`);
    this.setState({ books: booksFromServer.data });
    console.log(booksFromServer)
    console.log('running')
  }


  render() {

    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
          {this.state.books.map((book) => {
          return(
          <Carousel.Item>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          </Carousel.Item>)})}
          
        </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
