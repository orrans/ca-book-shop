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
