import React, { Component } from 'react';
import PropTypes from 'prop-types';
import updateShelf from './updateShelf';


class Books extends Component {

    static propTypes = {
      moveShelf: PropTypes.func.isRequired,
      book: PropTypes.object.isRequired
    }

    updateShelf(newShelf) {
      this.props.moveShelf(this.props.book, newShelf);
    }
/*
    componentDidMount() {
      const { books, getBookById } = this.props
      let bookOnShelf = getBookById(book.id);
      let shelf;
      if (bookOnShelf !== null) {
        shelf = bookOnShelf.shelf
      } else {
        shelf = 'none'
      }
      this.setState({bookShelf: shelf})

    }
*/
    render() {

      const { book } = this.props
        return (
            <div className="book">
              <div className="book-top">
                  <div className="book-cover" style={{width:"128px", height:"193px", backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail: ''})`}}></div>
                  <updateShelf
                    currentShelf = {book.shelf}
                    moveShelf = {this.updateShelf.bind(this)}
                    />
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
          </div>   
  
  )   
}
}

export default Books