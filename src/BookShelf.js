import React, { Component } from 'react';
import propTypes from 'prop-types';
import Books from './Books';

// need a system set up to account for Want to Read and Read.

/*
<div className="bookshelf">
                  <h2 className="bookshelf-title">Title</h2>
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
                                        currentShelf=""
                                    />
                                </li>
                            ))
                        }
                    </ol>
                  </div>
                </div>

*/


class Bookshelf extends Component {
    render() {
        return ('a') 
    }

}

export default Bookshelf