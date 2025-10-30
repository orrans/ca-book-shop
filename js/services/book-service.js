let gBooks = [
    {
        id: 'b101',
        title: 'The Adventures of Lori Ipsi',
        price: 120,
        imgUrl: 'lori-ipsi.jpg',
    },
    {
        id: 'b102',
        title: 'The Hidden Kingdom',
        price: 90,
        imgUrl: 'hidden-kingdom.jpg',
    },
    {
        id: 'b103',
        title: 'Coding for Wizards',
        price: 200,
        imgUrl: 'coding-wizards.jpg',
    },
]

function getBooks() {
    return gBooks
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

function _createBook(title, price) {
    return {
        id: `b${getRandomInt(100, 1000)}`,
        title,
        price,
        imgUrl: 'lori-ipsi.jpg',
    }
}
