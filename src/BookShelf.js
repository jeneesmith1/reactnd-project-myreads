import React from 'react';
import Books from './Books';


const BookShelf = (props) => { 
  return (
      <div className="bookshelf">
          <h2 className="bookshelf-title">{props.shelfTitle}</h2>
          <div className="bookshelf-books">
              <ol className="books-grid">
                  {props.books.filter(function (eachBook) {
                      return eachBook.shelf === props.shelfName
                  }).map((eachBook, index) => (
                      <li key={index} className='contact-list-item'>
                          <Books onBookShelfChange={props.onBookShelfChange} book={eachBook}/>
                      </li>
                  ))}
              </ol>
          </div>
      </div>
  )
}

export default BookShelf;