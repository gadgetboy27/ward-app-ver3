// Book class: Represents a book
class Book {
  constructor (title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}
// Ui class: Handle UI Tasks
class UI {
  static displayBooks () {
    const books = Store.getBooks()

    books.forEach((book) => UI.addBookToList(book))
  }
  static addBookToList (book) {
    const list = document.querySelector('#book-list')

    const row = document.createElement('tr')

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='btn btn-danger btn-sml 
        delete'>X</td>
        `
    list.appendChild(row)
  }

  static deleteBook (el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove()
    }
  }

  static showAlert (message, className) {
    const div = document.createElement('div')
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form)

    // Alert Disappers in 3 secs
    setTimeout(() => document.querySelector('.alert').remove(), 3000)
  }

  static clearFields () {
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#isbn').value = ''
  }
}
// Store Class: Handles Storage
class Store {
  static getBooks () {
    let books
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }

  static addBook (book) {
    const books = Store.getBooks()
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook (isbn) {
    const books = Store.getBooks()
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
  }
}
// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault()
  // Get the values of new book to Add to list
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const isbn = document.querySelector('#isbn').value

  // Validate all fields
  if (title === '' || author === '' || isbn === '') {
    // Insert book alert
    UI.showAlert('You havn\'t filled in all fields', 'danger')
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn)

    // Adds new book to UI
    UI.addBookToList(book)

    // Add book to storage
    Store.addBook(book)

    // Show success message
    UI.showAlert('book added', 'success')
    // Clear field values after submitting
    UI.clearFields()
  }
})

// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from list
  UI.deleteBook(e.target)

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
  // Show alert book deleted
  UI.showAlert('Book deleted', 'success')
})
