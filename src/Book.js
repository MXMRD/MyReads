import React, {Component} from 'react';

function Book (props) {
  console.log(props)
  
  return (
    <div className="book">
      <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={props.shelf}> {/*onChange={props.moveBook}*/}
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
      </div>
      <div className="book-title">{props.book.title}"</div>
      <div className="book-authors">{props.book.authors}</div> {/*Change list of authors to mapped array*/}
    </div>
  )
  
}

export default Book;