'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    let books = getBooks()

    var strHTMLs = books.map(
        (book) =>
            `<tr>
                    <td>${book.title}</td>
                    <td>${book.price}</td>
                    <td>
                        <button class="btn-read" onclick="onReadBook('${book.id}')">read</button>
                        <button class="btn-update" onclick="onUpdateBook('${book.id}')">update</button>
                        <button class="btn-delete" onclick="onRemoveBook('${book.id}')">delete</button>
                    </td>
                </tr>`
    )

    document.querySelector('.book-list').innerHTML = strHTMLs.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    const newPrice = +prompt('Enter new price')
    updatePrice(bookId, newPrice)
    renderBooks()
}

function onAddbook() {
    const title = prompt('Enter the book title')
    const price = +prompt('Enter the book price')
    addBook(title, price)
    renderBooks()
}

function onReadBook(bookId) {
    const elModal = document.querySelector('.modal')
    const elModalContent = document.querySelector('.modal-inner-content')
    elModal.classList.add('show')
    const book = getBook(bookId)

    const bookHtml = `
    <img src="${book.imgUrl}"/>
    <h3>${book.title}</h3>
    <h4>$${book.price}</h4>

    <div class="rating">
        <button onclick="onUpdateRating('${bookId}',-1)">-</button>
        <span class="book-rating">${book.rating}</span>
        <button onclick="onUpdateRating('${bookId}',1)">+</button>
    </div>
    `
    elModalContent.innerHTML = bookHtml
}

function onCloseModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('show')
}

function onUpdateRating(bookId, amount) {
    const bookRating = updateRating(bookId, amount)
    const elBookRating = document.querySelector('.book-rating')
    elBookRating.innerText = bookRating
}
