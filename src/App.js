import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Shelf from './Shelf.js';
import Book from './Book.js';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }

  componentDidMount() {
    this.updateBooks();
  }

  updateBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  moveBook = (bookID, target) => {
    BooksAPI.update(bookID, target)
      .then(() => {
        this.updateBooks()
      })
  }

  searchBooks = (event) => {
    BooksAPI.search(event.target.value)
      .then((searchResults) => {
        if (Array.isArray(searchResults)) {
          this.setState(() => ({searchResults}));
          this.addShelfs();
        }
        else this.setState(() => ({searchResults: []}))
      })
  }

  addShelfs = () => {
    let newSearchResults = this.state.searchResults.map((searchBook) => {
      let shelf = "none";
      this.state.books.forEach((book) => {
        if (book.id === searchBook.id) shelf = book.shelf;
      })
      searchBook.shelf = shelf;
      return searchBook;   
    })
    this.setState(() => ({searchResults: newSearchResults}))
  }
  
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  onChange={this.searchBooks}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchResults.map((BookObj, key) => (
                  <li key={key}><Book book={BookObj} move={this.moveBook} /></li>
                ))}
              </ol>
            </div>
          </div>
        )}/> 

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf 
                  title='Currently Reading' 
                  books={this.state.books.filter((book) => (book.shelf === "currentlyReading"))} 
                  move={this.moveBook}/>
                <Shelf 
                    title='Want to Read' 
                    books={this.state.books.filter((book) => (book.shelf === "wantToRead"))} 
                    move={this.moveBook}/>
                <Shelf 
                    title='Read' 
                    books={this.state.books.filter((book) => (book.shelf === "read"))} 
                    move={this.moveBook}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a Book!</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
