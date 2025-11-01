'use strict'

function onInit() {
    const elViewStateBtn = document.querySelector('.view-state')
    renderBooks()
    elViewStateBtn.innerText = viewButtonText
}

let showTable = loadFromStorage('view')
let viewButtonText = showTable ? 'cards' : 'table'
const star = '⭐'

function toggleView() {
    const elViewStateBtn = document.querySelector('.view-state')
    showTable = !showTable
    if (showTable) viewButtonText = 'cards'
    else viewButtonText = 'table'
    elViewStateBtn.innerText = viewButtonText
    renderBooks()
    saveToStorage('view', showTable)
}

function renderBooks() {
    let books = getBooks()
    let strHTMLs
    const elTableBody = document.querySelector('.book-list')
    if (showTable) {
        getTable()
        if (!books.length) {
            elTableBody.innerHTML = `
        <tr class="no-books-msg">
            <td colspan="3">No matching books were found...</td>
        </tr>
    `
            calculateInventory()
            return
        }

        strHTMLs = books.map(
            (book) =>
                `<tr>
                    <td>${book.title}</td>
                    <td>$${book.price}</td>
                    <td>
                        <button class="btn-read" onclick="onReadBook('${book.id}')">read</button>
                        <button class="btn-update" onclick="onUpdateBook('${book.id}')">update</button>
                        <button class="btn-delete" onclick="onRemoveBook('${book.id}')">delete</button>
                    </td>
                </tr>`
        )

        document.querySelector('.book-list').innerHTML = strHTMLs.join('')
    } else {
        getGrid()
        strHTMLs = books.map(
            (book) => `<div class="card" onclick="onReadBook('${book.id}')"> 
                <h3>${book.title}</h3>
                <img src="${book.imgUrl}"/>
                <h4>$${book.price}</h4>
                <h4 class="book-rating">${star.repeat(book.rating)}</h4>
                <button class="btn-read" onclick="onReadBook('${book.id}')">read</button>
                        <button class="btn-update" onclick="onUpdateBook('${
                            book.id
                        }')">update</button>
                        <button class="btn-delete" onclick="onRemoveBook('${
                            book.id
                        }')">delete</button>
                </div>`
        )
        document.querySelector('.grid').innerHTML = strHTMLs.join('')
    }

    calculateInventory()
}

function getTable() {
    const x = document.querySelector('.container')
    x.innerHTML = `<table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="book-list"></tbody>
        </table>`
}

function getGrid() {
    const x = document.querySelector('.container')
    x.innerHTML = `<div class="grid">
    </div>`
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
    if (title === null) return
    while (!title || !title.trim()) {
        title = prompt('Title cannot be empty!\nEnter the book title')
        if (title === null) return
    }

    const bookExists = isBookExists(title)
    let price

    if (bookExists) {
        elModalContent.innerText = `Book "${title}" already exists!`
    } else {
        price = +prompt('Enter the book price')
        if (price === null) return
        while (isNaN(price) || price <= 0) {
            price = +prompt('Please enter valid book price!\nEnter the book price')
            if (price === null) return
        }

        addBook(title, price)
        renderBooks()
        elModalContent.innerText = `Book "${title}" added successfully!`
    }

    elModal.classList.add('show')
    setTimeout(() => elModal.classList.remove('show'), 2000)
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
        <span class="book-rating">${star.repeat(book.rating)}</span>
        <div class="rating-buttons">
        <button onclick="onUpdateRating('${bookId}',-1)">-</button>
        <button onclick="onUpdateRating('${bookId}',1)">+</button>
        </div>
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
    const elModal = document.querySelector('.modal')
    const elBookRating = elModal.querySelector('.book-rating')
    elBookRating.innerText = star.repeat(bookRating)
    renderBooks()
}

function onSearchBook(searchTxt) {
    if (!searchTxt) {
        renderBooks()
        return
    }

    searchTxt = searchTxt.toLowerCase()

    const filteredBooks = getBooks().filter((book) => book.title.toLowerCase().includes(searchTxt))

    if (!filteredBooks.length) {
        let elTableBody = document.querySelector('.book-list')
        elTableBody.innerHTML = `
        <tr class="no-books-msg">
            <td colspan="3">No matching books were found...</td>
        </tr>
        `
        return
    }

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
