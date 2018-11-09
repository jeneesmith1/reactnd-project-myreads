import React, { Component } from 'react';
import Books from './Books';
import * as BooksAPI from './BooksAPI';
import escapeRegExp from 'escape-string-regexp';
import { Link } from 'react-router-dom'
 

class SearchPage extends Component {
    state = {
        query: '',
        searchedBooks: [],
    }
    updateQuery = (query) => {
        this.setState({
            query: query
        })
        this.updateSearchedBooks(query);
    }

    updateSearchedBooks = (query) => {
        if (query) {
            BooksAPI.search(query).then((searchedBooks) => {
                if (searchedBooks.error) {
                    this.setState({ searchedBooks: [] })
                } else {
                    this.setState({ searchedBooks: searchedBooks })
                }

            })
        } else {

        }
    }

    render() {
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
        } else{
            this.setState({ searchedBooks: this.searchedBooks})
        }
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link 
                className="close-search"
                to='/'
                > </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchedBooks.map(searchedBooks => {
                    let shelf = "none";

                    this.props.books.map(book => (
                        book.id === searchedBooks.id ?
                            shelf = book.shelf : 
                            ''
                    ));


                    return (
                        <li key={searchedBooks.id}>
                        <Books
                            books={searchedBooks}
                            moveShelf={this.props.moveShelf}
                            currentShelf={shelf}
                        />
    
                        </li>
                    )

                }
                )}
              </ol>
            </div>
          </div>
        )
    }

}

export default SearchPage