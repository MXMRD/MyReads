import React from 'react';

function Book (props) {
  return (
    <div className="book">
      <div className="book-top">
          <div 
            className="book-cover" 
            style={{ 
              width: 128, 
              height: 193, 
              backgroundImage: props.book.imageLinks ? `url(${props.book.imageLinks.thumbnail})` : "" }}
          ></div>
          <div className="book-shelf-changer">
            <select value={props.book.shelf ? props.book.shelf : "None"} onChange={(event) => props.move({id: props.book.id}, event.target.value)}>
              <optgroup label='Move'>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </optgroup>
            </select>
          </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      {props.book.authors ? props.book.authors.map((author, key) => (
      <div key={key} className="book-authors">{author}</div>)) : <div></div>
      }
    </div>
  )
  
}

export default Book;