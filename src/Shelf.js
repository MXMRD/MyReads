import React from 'react';
import Book from "./Book.js";

function Shelf (props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((BookObj, key) => (
            <li key={key}><Book book={BookObj} move={props.move}/></li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Shelf;