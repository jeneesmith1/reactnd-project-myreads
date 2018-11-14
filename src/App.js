import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Books from './Books'
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'

class App extends React.Component {
    state = {
        books: [],
        query: '',
        searchResults: []
    };

    componentDidMount() {
        this.displayAllBooks();
    };

    displayAllBooks() {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    };

    updateQuery = (query) => {
        this.setState({query: query.trimLeft()});

        if (query.length === 0) {
            this.setState({searchResults: ""});
        }
        else {
            this.setState({searchResults: ""});
            BooksAPI.search(query.trimLeft()).then((searchResults) => {
                // console.log(searchResults);
                if (Array.isArray(searchResults) && searchResults.length > 0) {
                    searchResults.map((searchBook, index) => {
                        let temp = this.state.books.filter((shelfBook) => {
                            return shelfBook.id === searchBook.id;
                        });
                        // console.log(temp);
                        if (Array.isArray(temp) && temp.length > 0) {
                            searchResults[index].shelf = temp[0].shelf;
                        }
                        else {
                            searchResults[index].shelf = "none";
                        }
                        return temp;
                    });
                    this.setState({searchResults});
                    this.displayAllBooks();
                }
            })
        }
    };

    changeBookShelf = (book, shelf) => {
        //console.log("State of " + book.id + " changed to " + shelf);
        BooksAPI.update(book, shelf).then((books) => {
            if (books) {
                this.displayAllBooks();
                this.updateQuery(this.state.query);
            }
        })
    };

    render() {
        const {query} = this.state;
        let results = this.state.searchResults;
        results = (results && results.length >= 1) ? results : [];

        return (
            <div className="app">
                <Route path="/search"
                       render={() => (
                           <div className="search-books">
                               <div className="search-books-bar">
                                   <Link to="/" className="close-search"
                                         onClick={() => (
                                             this.setState({query: ""}, {results: ""})
                                         )}>Close</Link>

                                   <div className="search-books-input-wrapper">
                                       <input type="text"
                                              placeholder="Search by title or author"
                                              value={query}
                                              onChange={(event) => this.updateQuery(event.target.value)}/>

                                   </div>
                               </div>
                              
                               <div className="search-books-results">
                                   <ol className="books-grid">
                                       {
                                           results.map((eachBook, index) => (
                                               <li key={index} className='contact-list-item'>
                                                   <Books
                                                       onBookShelfChange={this.changeBookShelf}
                                                       book={eachBook}
                                                   />
                                               </li>
                                           ))
                                       }
                                   </ol>
                               </div>
                           </div>
                       )}
                />
                <Route exact path="/"
                       render={() => (
                           <div className="list-books">
                               <div className="list-books-title">
                                   <h1>MyReads</h1>
                               </div>
                               <div className="list-books-content">
                                   <div>
                                       <BookShelf onBookShelfChange={this.changeBookShelf} shelfTitle={"Currently Reading"}
                                              shelfName={"currentlyReading"}
                                              books={this.state.books}/>
                                       <BookShelf onBookShelfChange={this.changeBookShelf} shelfTitle={"Want to Read"}
                                              shelfName={"wantToRead"} books={this.state.books}/>
                                       <BookShelf onBookShelfChange={this.changeBookShelf} shelfTitle={"Read"}
                                              shelfName={"read"}
                                              books={this.state.books}/>
                                   </div>
                               </div>
                               <div className="open-search">
                                   <Link
                                       to='/search'
                                   >Add a book</Link>
                               </div>
                           </div>
                       )}
                />
            </div>
        )
    }
}

export default App;
