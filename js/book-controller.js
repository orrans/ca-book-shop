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
                        <button class="btn-read" onclick="onReadBook('${book.id}', event)">read</button>
                        <button class="btn-update" onclick="onUpdateBook('${book.id}', event)">update</button>
                        <button class="btn-delete" onclick="onRemoveBook('${book.id}', event)">delete</button>
                    </td>
                </tr>`
    )

    document.querySelector('.book-list').innerHTML = strHTMLs.join('')
}

function onRemoveBook(bookId, ev) {
    ev.stopPropagation()
    removeBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId, ev) {
    ev.stopPropagation()
    const newPrice = +prompt('Enter new price')
    updatePrice(bookId, newPrice)
    renderBooks()
}

function onAddbook(ev) {
    const title = prompt('Enter the book title')
    const price = +prompt('Enter the book price')
    addBook(title, price)
    renderBooks()
}
