let gBooks = [
    {
        id: 'b101',
        title: 'The Adventures of Lori Ipsi',
        price: 120,
        rating: 2,
        imgUrl: 'https://picsum.photos/200/300/?1',
    },
    {
        id: 'b102',
        title: 'The Hidden Kingdom',
        price: 90,
        rating: 2,
        imgUrl: 'https://picsum.photos/200/300/?2',
    },
    {
        id: 'b103',
        title: 'Coding for Wizards',
        price: 200,
        rating: 2,
        imgUrl: 'https://picsum.photos/200/300/?3',
    },
]

function getBooks() {
    return gBooks
}

function getBook(bookId) {
    return gBooks.find((book) => book.id === bookId)
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex((book) => book.id === bookId)
    gBooks.splice(gBooks[bookIdx], 1)
}

function updatePrice(bookId, price) {
    const book = gBooks.find((book) => book.id === bookId)
    book.price = price
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

function addBook(title, price) {
    const book = _createBook(title, price)
    gBooks.push(book)
    console.log(book)
}

function updateRating(bookId, amount) {
    const bookIdx = gBooks.findIndex((book) => book.id === bookId)
    gBooks[bookIdx].rating += amount
    const bookRating = gBooks[bookIdx].rating
    if (bookRating < 0) gBooks[bookIdx].rating = 0
    else if (bookRating > 5) gBooks[bookIdx].rating = 5
    return gBooks[bookIdx].rating
}

function _createBook(title, price) {
    const randImgId = getRandomInt(1, 9999)
    return {
        id: `b${getRandomInt(100, 1000)}`,
        title,
        price,
        rating: 0,
        imgUrl: `https://picsum.photos/200/300/?${randImgId}`,
    }
}

function _getBookById(bookId) {
    return gBooks.find((book) => book.id === bookId)
}
