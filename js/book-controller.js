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
                        <button class="btn-read">read</button>
                        <button class="btn-update">update</button>
                        <button class="btn-delete">delete</button>
                    </td>
                </tr>`
    )

    document.querySelector('.book-list').innerHTML = strHTMLs.join('')
}
