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
    isRead,
) {
    if (!new.target) {
        throw new Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.number = myLibrary.length + 1;
    this.isRead = isRead;

    this.archieve = function () {
        myLibrary.push(this);
    }
}

function addBookToLibrary() {
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("author").value;
    const isRead = document.getElementById("is-read").checked;

    const newBook = new Book(title, author, isRead);
    newBook.archieve();
    renderBooks();
}

function removeBookFromLibrary(e) {
    const id = e.target.closest(".card").dataset.id;
    const index = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(index, 1);
    renderBooks();
}

function readBookFromLibrary(e) {
    const id = e.target.closest(".card").dataset.id;
    const index = myLibrary.findIndex(book => book.id === id);
    if (myLibrary[index].isRead) {
        alert("You already read this book!");
    } else {
        myLibrary[index].isRead = true
        renderBooks();
    }
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
                <button class="read-book">Mark as read</button>
                <button class="remove-book">Delete</button>
            </div>`;
    }

    const bookshelf = document.getElementById("bookshelf");
    bookshelf.innerHTML = html; // xss !!!

    const deleteBtn = document.getElementsByClassName("remove-book")
    for (const removeBook of deleteBtn) {
        removeBook.addEventListener("click", (e) => {
            removeBookFromLibrary(e);
        })
    }

    const readBtn = document.getElementsByClassName("read-book")
    for (const readBook of readBtn) {
        readBook.addEventListener("click", (e) => {
            readBookFromLibrary(e);
        })
    }
}

function renderModal() {
    const showDialog = document.getElementById("show-dialog");
    const modalDialog = document.getElementById("modal-dialog");
    const addBook = document.getElementById("add-book");
    const cancelBtn = document.getElementById("cancel");

    showDialog.addEventListener("click", () => {
        modalDialog.showModal();
    })

    cancelBtn.addEventListener("click", () => {
        modalDialog.close();
    });

    addBook.addEventListener("submit", (e) => {
        e.preventDefault();
        addBookToLibrary();
    })
}

renderBooks();
renderModal();
