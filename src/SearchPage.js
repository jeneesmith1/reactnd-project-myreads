import React, { Component } from 'react';
import Books from './Books';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

 

class SearchPage extends Component {
    static propTypes = {
        updateShelf: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
       }

    state = {
        query: '',
        searchedBooks: [],
    }
    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })
        this.updateSearchedBooks();
    }

    updateSearchedBooks = () => {
        BooksAPI.search(this.state.query, 20).then((SearchedBooks) => {
            this.setState({ SearchedBooks });
        });
    }
 
      checkForShelf = (book) => {
        const matchingBook = this.props.books.filter(b => b.id === book.id)
        if (matchingBook[0]) {
          book.shelf = matchingBook[0].shelf;
        } else {
          book.shelf = 'none';
        }
      }

    render() {

        const { searchedBooks, query } = this.state;
        
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link 
                className="close-search"
                to='/'
                > </Link>
              <div className="search-books-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                 { searchedBooks && 
                    searchedBooks.map((book) => (
                        <li key={book.id}>
                        { this.checkForShelf(book) }

                    ) }
                        <Books
                            books={book}
                            moveShelf={this.props.updateShelf}
                        />
                    </li>
                    ))}
              </ol>
            </div>
          </div>
        )
    }

}

export default SearchPage