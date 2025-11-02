'use strict'

let gIsTable = loadFromStorage('view')
let gViewButtonText = gIsTable ? 'cards' : 'table'
const gStar = '⭐'

function onInit() {
    const elViewStateBtn = document.querySelector('.view-state')
    renderBooks()
    elViewStateBtn.innerText = gViewButtonText
}

function toggleView() {
    const elViewStateBtn = document.querySelector('.view-state')
    gIsTable = !gIsTable
    gViewButtonText = gIsTable ? 'cards' : 'table'
    elViewStateBtn.innerText = gViewButtonText
    renderBooks()
    saveToStorage('view', gIsTable)
}

function renderBooks() {
    const books = getBooks()
    const elTableContainer = document.querySelector('.container-table')
    const elGridContainer = document.querySelector('.container-grid')

    if (gIsTable) {
        elTableContainer.classList.remove('hidden')
        elGridContainer.classList.add('hidden')
        renderBooksTableContent(books)
    } else {
        elGridContainer.classList.remove('hidden')
        elTableContainer.classList.add('hidden')
        renderBooksGridContent(books)
    }

    calculateInventory()
}

function renderBooksTableContent(books) {
    const elTableBody = document.querySelector('.book-list')

    if (!books.length) {
        elTableBody.innerHTML = `
            <tr class="no-books-msg">
                <td colspan="4">No matching books were found...</td>
            </tr>`
        return
    }

    const strHTMLs = books.map(
        (book) => `
        <tr>
            <td>${book.title}</td>
            <td>$${book.price}</td>
            <td class="table-rating">${gStar.repeat(book.rating)}</td>
            <td>
                <button class="btn-read" onclick="onReadBook('${book.id}')">read</button>
                <button class="btn-update" onclick="onUpdateBook('${book.id}')">update</button>
                <button class="btn-delete" onclick="onRemoveBook('${book.id}')">delete</button>
            </td>
        </tr>`
    )

    elTableBody.innerHTML = strHTMLs.join('')
}

function renderBooksGridContent(books) {
    const elGrid = document.querySelector('.container-grid .grid')
    if (!books.length) {
        elGrid.innerHTML = `<p class="empty-grid-msg">No matching books were found...</p>`
        return
    }

    const strHTMLs = books.map(
        (book) => `
        <div class="card" onclick="onReadBook('${book.id}')">
            <h3>${book.title}</h3>
            <img src="${book.imgUrl}" />
            <h4>$${book.price}</h4>
            <h4 class="book-rating">${gStar.repeat(book.rating)}</h4>
            <div class="card-actions">
                <button class="btn-read" onclick="event.stopPropagation(); onReadBook('${
                    book.id
                }')">read</button>
                <button class="btn-update" onclick="event.stopPropagation(); onUpdateBook('${
                    book.id
                }')">update</button>
                <button class="btn-delete" onclick="event.stopPropagation(); onRemoveBook('${
                    book.id
                }')">delete</button>
            </div>
        </div>`
    )

    elGrid.innerHTML = strHTMLs.join('')
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

function openBookModal(mode, bookId = null) {
    const elModal = document.querySelector('.modal')
    const elModalContent = document.querySelector('.modal-inner-content')

    let titleText = ''
    let priceValue = ''
    let imgUrl = ''
    let book = null

    if (mode === 'edit') {
        book = getBook(bookId)
        imgUrl = book.imgUrl
        titleText = book.title
        priceValue = book.price
    }

    const heading = mode === 'add' ? 'Add new book' : 'Edit book'
    const actionLabel = mode === 'add' ? 'Add' : 'Save'

    elModalContent.innerHTML = `
        <h3>${heading}</h3>
        <div class="add-book-form">
        ${
            mode === 'edit'
                ? `
                <div class="edit-book-img">
                    <img src="${imgUrl}" alt="${titleText}" />
                </div>
            `
                : ''
        }
            <div class="add-book-row">
                <label for="book-title">Book title:</label>
                <input type="text" id="book-title" placeholder="Enter book title" value="${
                    mode === 'edit' ? titleText : ''
                }" />
            </div>
            <div class="add-book-row">
                <label for="book-price">Book price:</label>
                <input type="number" id="book-price" placeholder="Enter book price" min="1" value="${
                    mode === 'edit' ? priceValue : ''
                }" />
            </div>
            <div class="modal-buttons">
                <button class="btn-add" onclick="onConfirmBook('${mode}'${
        bookId ? `, '${bookId}'` : ''
    })">${actionLabel}</button>
                <button class="btn-delete" onclick="onCloseModal()">Cancel</button>
            </div>
        </div>
    `
    elModal.classList.add('show')
}

function onUpdateBook(bookId) {
    openBookModal('edit', bookId)
}

function onAddbook() {
    openBookModal('add')
}

function onConfirmBook(mode, bookId = null) {
    const elTitle = document.querySelector('#book-title')
    const elPrice = document.querySelector('#book-price')
    const elModal = document.querySelector('.modal')
    const elModalContent = document.querySelector('.modal-inner-content')

    const titleInput = elTitle.value.trim()
    const priceInput = elPrice.value.trim()

    if (mode === 'add') {
        if (!titleInput) {
            elModalContent.querySelector('h3').innerText = 'Title cannot be empty!'
            return
        }
        if (isBookExists(titleInput)) {
            elModalContent.querySelector('h3').innerText = `Book "${titleInput}" already exists!`
            return
        }
        const price = +priceInput
        if (!price || isNaN(price) || price <= 0) {
            elModalContent.querySelector('h3').innerText = 'Please enter a valid price!'
            return
        }

        addBook(titleInput, price)
        renderBooks()
        elModalContent.innerHTML = `<h3>Book "${titleInput}" added successfully!</h3>`
        setTimeout(() => elModal.classList.remove('show'), 1500)
        return
    }

    const book = getBook(bookId)
    const newTitle = titleInput || book.title
    const newPrice = priceInput ? +priceInput : book.price

    if (newPrice <= 0 || isNaN(newPrice)) {
        elModalContent.querySelector('h3').innerText = 'Please enter a valid price!'
        return
    }

    updateBook(bookId, newTitle, newPrice)
    renderBooks()

    elModalContent.innerHTML = `<h3>Book "${newTitle}" updated successfully!</h3>`
    setTimeout(() => elModal.classList.remove('show'), 1500)
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
        <span class="book-rating">${gStar.repeat(book.rating)}</span>
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
    elBookRating.innerText = gStar.repeat(bookRating)
    renderBooks()
}

function onSearchBook(searchTxt) {
    if (!searchTxt) {
        renderBooks()
        return
    }

    const filteredBooks = getBooks().filter((book) =>
        book.title.toLowerCase().includes(searchTxt.toLowerCase())
    )

    if (gIsTable) {
        document.querySelector('.book-list').innerHTML = renderBooksTable(filteredBooks)
    } else {
        document.querySelector('.grid').innerHTML = renderBooksGrid(filteredBooks)
    }
}

function renderBooksTable(books) {
    console.log(books.length)
    if (!books.length) {
        return `
        <tr class="no-books-msg">
            <td colspan="4">No matching books were found...</td>
        </tr>`
    }

    return books
        .map(
            (book) => `
            <tr>
                <td>${book.title}</td>
                <td>$${book.price}</td>
                <td>
                    <button class="btn-read" onclick="onReadBook('${book.id}')">read</button>
                    <button class="btn-update" onclick="onUpdateBook('${book.id}')">update</button>
                    <button class="btn-delete" onclick="onRemoveBook('${book.id}')">delete</button>
                </td>
            </tr>`
        )
        .join('')
}

function renderBooksGrid(books) {
    if (!books.length) {
        return `<p class="empty-grid-msg">No matching books were found...</p>`
    }

    return books
        .map(
            (book) => `
            <div class="card" onclick="onReadBook('${book.id}')">
                <h3>${book.title}</h3>
                <img src="${book.imgUrl}" />
                <h4>$${book.price}</h4>
                <h4 class="book-rating">${gStar.repeat(book.rating)}</h4>
                <div class="card-actions">
                    <button class="btn-read" onclick="event.stopPropagation(); onReadBook('${
                        book.id
                    }')">read</button>
                    <button class="btn-update" onclick="event.stopPropagation(); onUpdateBook('${
                        book.id
                    }')">update</button>
                    <button class="btn-delete" onclick="event.stopPropagation(); onRemoveBook('${
                        book.id
                    }')">delete</button>
                </div>
            </div>`
        )
        .join('')
}

function clearSearch() {
    const elSearchBar = document.querySelector('[name="search-bar"]')
    elSearchBar.value = ''
    renderBooks()
}
