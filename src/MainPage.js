import React, { Component } from 'react';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Books from './Books';



class MainPage extends Component {
    static propTypes = {
        moveShelf: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }
    render() {
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
}
                      {
                        this.props.books
                            .filter(book => book.shelf === "Currently Reading")
                            .map(book => (
                                <li key={book.id}>
                                    <Books 
                                        book={book}
                                        moveShelf={this.props.moveShelf}
                                        currentShelf="currentlyReading"
                                    />
                                </li>
                            ))
                        }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Title</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
}
                      {
                        this.props.books
                            .filter(book => book.shelf === "Want to Read")
                            .map(book => (
                                <li key={book.id}>
                                    <Books 
                                        book={book}
                                        moveShelf={this.props.moveShelf}
                                        currentShelf="wantToRead"
                                    />
                                </li>
                            ))
                        }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Title</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
}
                      {
                        this.props.books
                            .filter(book => book.shelf === "Read")
                            .map(book => (
                                <li key={book.id}>
                                    <Books 
                                        book={book}
                                        moveShelf={this.props.moveShelf}
                                        currentShelf="read"
                                    />
                                </li>
                            ))
                        }
                    </ol>
                  </div>
                </div>
              <div>
              <BookShelf />
              </div>
            </div>
            <div className="open-search">
              <Link 
              to='/search'
              >Add a book</Link>
            </div>
          </div>
        );
    }

}

export default MainPage