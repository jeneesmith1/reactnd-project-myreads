import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';


class MainPage extends Component {
    state = {
        books: []
      }
    
      componentDidMount() {
        this.updateBooks();
      }
    
      updateBooks() {
        BooksAPI.getAll().then((books) => {
          this.setState({ books })
        });
      }
    
      updateBook(book, newShelf) {
        BooksAPI.update(book, newShelf);
    
        const matchingBook = this.state.books.filter(b => b.id === book.id);
        if  (!matchingBook[0]) {
          book.shelf = newShelf;
          this.setState(state => ({
              books: state.books.concat([ book ])
          }))
        } else {
          matchingBook[0].shelf = newShelf;
          this.setState(this.state);
        }
      }
    
    static propTypes = {
        moveShelf: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }
    render() {
        const { books } = this.state;

        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            <div>
            <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <BookShelf
                    moveShelf={this.updateBook.bind(this)}
                    books = {books.filter((book) => book.shelf === "currentlyReading")}
                  />
                  </div>
            <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookShelf
                    moveShelf={this.updateBook.bind(this)}
                    books = {books.filter((book) => book.shelf === "wantToRead")}
                  />
                  </div>
                  <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookShelf
                    moveShelf={this.updateBook.bind(this)}
                    books = {books.filter((book) => book.shelf === "read")}
                  />
                  </div>
              </div>
            </div>
          </div>
        )}



}

export default MainPage