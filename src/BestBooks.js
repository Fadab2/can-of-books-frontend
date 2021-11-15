import React from 'react';
import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel';
import Button from "react-bootstrap/Button"
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';

class BestBooks extends React.Component {

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */

  postNewBook = async () => {
    console.log(this.props.newBook)
    let url = `${process.env.REACT_APP_SERVER_URL}/books`
    // let url = `${process.env.REACT_APP_SERVER_URL}/books?email=${this.props.email}` //get email from apps.js
    let res = await axios.post(url, this.props.newBook);
    // let res = await axios.get(url);
    this.setState({ books: [...this.state.books, res.data] });
    // this.setState({ books: res.data})
  }

componentDidMount() {
    this.props.getBooks()
  }

  render() {

    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.props.books.length ? (
          <Container>
            <Carousel>
              {this.props.books.map((book) => {
                return (

                  <Carousel.Item key={book.key}>
                    <img src="https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="d-block w-100" alt="..."
                      style={{ height: '350px' }} />
                    <div class="carousel-caption d-none d-md-block">
                      <h5>{book.title}</h5>
                      <p>{book.description}</p>
                      <div>
                      {(book.status) ? (<Badge bg="success">Read</Badge>) : (<Badge bg="secondary">Unread</Badge>) 
                      }
                      </div>
                      <Button style={{margin: "5px", padding: "4px"}} variant="secondary" onClick={() => this.props.deleteBooks(book)}>Remove Book</Button>
                      <Button style={{margin: "5px", padding: "4px"}} variant="secondary" onClick={() => { this.props.openForm(book._id, book.email) }}>Update Book</Button>
                    </div>
                  </Carousel.Item>)
              })}

            </Carousel>
          </Container>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        <Button variant="primary" onClick={this.props.openModal}>Add Book</Button>
      </>
    )
  }
}

export default BestBooks;

