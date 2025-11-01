let gBooks
const storageKey = 'booksDB'

_createBooks()

function getBooks() {
    return gBooks
}

function getBook(bookId) {
    return gBooks.find((book) => book.id === bookId)
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex((book) => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    _saveToLocalStorage()
}

function updatePrice(bookId, price) {
    const book = gBooks.find((book) => book.id === bookId)
    book.price = price
    _saveToLocalStorage()
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

function addBook(title, price) {
    if (isBookExists(title)) return
    const book = _createBook(title, price)
    gBooks.push(book)

    _saveToLocalStorage()
}

function updateRating(bookId, amount) {
    const bookIdx = gBooks.findIndex((book) => book.id === bookId)
    gBooks[bookIdx].rating += amount
    const bookRating = gBooks[bookIdx].rating
    if (bookRating < 0) gBooks[bookIdx].rating = 0
    else if (bookRating > 5) gBooks[bookIdx].rating = 5
    _saveToLocalStorage()

    return gBooks[bookIdx].rating
}

function isBookExists(title) {
    return gBooks.find((book) => book.title.toLowerCase() === title.toLowerCase())
}

function calculateInventory() {
    const elCheapBooks = document.querySelector('.cheap-book-count')
    const elAverageBooks = document.querySelector('.average-book-count')
    const elExpensiveBooks = document.querySelector('.expensive-book-count')

    const books = getBooks()

    const cheapBooks = books.filter((book) => book.price < 80).length
    const averageBooks = books.filter((book) => book.price >= 80 && book.price <= 200).length
    const expensiveBooks = books.filter((book) => book.price > 200).length

    elCheapBooks.innerText = cheapBooks
    elAverageBooks.innerText = averageBooks
    elExpensiveBooks.innerText = expensiveBooks
}

function _createBook(title, price) {
    const randImgId = getRandomInt(1, 9999)
    return {
        id: `b${getRandomInt(100, 1000)}`,
        title,
        price,
        rating: 0,
        imgUrl: `https://picsum.photos/seed/${randImgId}/200/300`,
    }
}

function _createBooks() {
    gBooks = loadFromStorage(storageKey)

    if (!gBooks || !gBooks.length) {
        gBooks = [
            _createBook('The Adventures of Lori Ipsi', 90),
            _createBook('The Hidden Kingdom', 120),
            _createBook('Coding for Wizards', 190),
        ]
    }
}

function _getBookById(bookId) {
    return gBooks.find((book) => book.id === bookId)
}

function _saveToLocalStorage() {
    saveToStorage(storageKey, gBooks)
}
