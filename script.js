const myLibrary = [
    { id: crypto.randomUUID(), title: "The Hobbit", author: "J.R.R. Tolkien", number: 1, isRead: true },
    { id: crypto.randomUUID(), title: "Neuromancer", author: "William Gibson", number: 2, isRead: false },
    { id: crypto.randomUUID(), title: "Dune", author: "Frank Herbert", number: 3, isRead: true },
    { id: crypto.randomUUID(), title: "Project Hail Mary", author: "Andy Weir", number: 4, isRead: false },
    { id: crypto.randomUUID(), title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", number: 5, isRead: true }
];

function Book(
    title,
    author,
    number,
    isRead,
) {
    if (!new.target) {
        throw new Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.number = number;
    this.isRead = isRead;
}

function addBookToLibrary() {
    // take params, create a book then store it in the array
}

function renderBooks() {
    let html = '';
    for (const book of myLibrary) {
        html +=
            `<div class="card" data-id="${book.id}">
            <h2>${book.title}</h2>
            <ul>
                <li>${book.author}</li>
                <li>${book.isRead}</li>
                <li>${book.number}</li>
            </ul>
        </div>`;
    }

    const bookshelf = document.getElementById("bookshelf");
    bookshelf.innerHTML = html; // xss !!!
}

renderBooks();