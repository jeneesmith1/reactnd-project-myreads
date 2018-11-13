import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Books from './Books';

class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    moveShelf: PropTypes.func.isRequired
  }

  render () {
    const { title, books, moveShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Books
                  book={book}
                  moveShelf={moveShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf