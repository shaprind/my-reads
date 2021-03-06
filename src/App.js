import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import BookList from './BookList'

/*Code reference
 * I would like to point to several people that have helped
 * either directly via Udacity or indirectly via github
 * Paul Coffield
 * https://github.com/sarah-maris/reactnd-project-myreads/blob/master/README.md
 * https://github.com/KatyaHorton/Udacity-MyReads-PROJECT
 */

class App extends React.Component {
  state = {
      books: []
    }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelfName) => {
    const updateBook = this.state.books.find(b => b.id === book.id);
    if (updateBook) {
      // update shelf
      updateBook.shelf = shelfName;
      BooksAPI.update(book, shelfName)
      .then(this.setState(currentState => ({
        books: currentState.books
      })))
    } else {
      // add book
        book.shelf = shelfName;
        BooksAPI.update(book, shelfName)
        .then(this.setState(prevState => ({
          books: prevState.books.concat(book)
      })))
    }
  };

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
            <BookList
             books={this.state.books}
             changeShelf={this.changeShelf}
            />
          )}
        />

        <Route path="/search" render={() => (
            <SearchPage
             books={this.state.books}
             changeShelf={this.changeShelf}
            />
          )}
        />

      </div>
    )
  }
}

export default App
