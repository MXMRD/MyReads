import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import Shelf from './Shelf.js';

/* TODO: 
* Implement Links to routing.
* Implement Search-Shelf
*/


class BooksApp extends React.Component {
  state = {
    books: []
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
        console.log(this.state);
      })
  }

  moveBook = (bookID, target) => {
    BooksAPI.update(bookID, target)
      .then(() => {
        this.updateBooks()
      })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
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
              <a onClick={() => console.log(this.state)}>Add a book</a>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
