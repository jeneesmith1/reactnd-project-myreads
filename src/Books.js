import React from 'react';


class Books extends React.Component {
  render() {
  let url = (this.props.book.imageLinks) ? 'url(' + this.props.book.imageLinks.thumbnail + ')' : '';
  let author = (this.props.book.authors && this.props.book.authors.length > 0) ? this.props.book.authors : [];

  return (
      <div className="book">
          <div className="book-top">
              <div className="book-cover"
                   style={{width: 128, height: 193, backgroundImage: url.toString()}}></div>
              <div className="book-shelf-changer">
                  <select onChange={(e) => this.props.onBookShelfChange(this.props.book, e.target.value)}
                          value={this.props.book.shelf}>
                      <option value="" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                  </select>
              </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
              {Array.isArray(author)?author.join(', '):''}
          </div>
      </div>
  )
  }
}

export default Books;

