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
