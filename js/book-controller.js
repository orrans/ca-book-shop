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
    const elModal = document.querySelector('.modal')
    const elModalContent = document.querySelector('.modal-inner-content')
    const book = getBook(bookId)

    if (!confirm(`Are you sure you want to remove "${book.title}"?`)) return

    removeBook(bookId)
    renderBooks()

    elModal.classList.add('show')
    elModalContent.innerText = `Book ${book.title} removed successfully!`
    setTimeout(() => {
        elModal.classList.remove('show')
    }, 2000)
}

function onUpdateBook(bookId) {
    const newPrice = +prompt('Enter new price')
    updatePrice(bookId, newPrice)
    renderBooks()
}

function onAddbook() {
    const elModal = document.querySelector('.modal')
    const elModalContent = document.querySelector('.modal-inner-content')

    let title = prompt('Enter the book title')
    while (!title || !title.trim()) {
        title = prompt('Enter the book title')
    }
    let price = +prompt('Enter the book price')
    while (isNaN(price) || price <= 0) {
        price = +prompt('Enter the book price')
    }

    addBook(title, price)
    renderBooks()
    elModal.classList.add('show')
    elModalContent.innerText = `Book "${title}" added successfully!`
    setTimeout(() => {
        elModal.classList.remove('show')
    }, 2000)
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

function onSearchBook(searchTxt) {
    if (!searchTxt) {
        renderBooks()
        return
    }

    searchTxt = searchTxt.toLowerCase()

    const filteredBooks = getBooks().filter((book) => book.title.toLowerCase().includes(searchTxt))

    const strHTMLs = filteredBooks.map(
        (book) => `
        <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button class="btn-read" onclick="onReadBook('${book.id}')">read</button>
                <button class="btn-update" onclick="onUpdateBook('${book.id}')">update</button>
                <button class="btn-delete" onclick="onRemoveBook('${book.id}')">delete</button>
            </td>
        </tr>
    `
    )
    document.querySelector('.book-list').innerHTML = strHTMLs.join('')
}

function clearSearch() {
    const elSearchBar = document.querySelector('[name="search-bar"]')
    elSearchBar.value = ''
    renderBooks()
}
