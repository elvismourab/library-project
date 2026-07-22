const myLibrary = [
    { id: crypto.randomUUID(), title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310, isRead: true },
    { id: crypto.randomUUID(), title: "Neuromancer", author: "William Gibson", pages: 271, isRead: false },
    { id: crypto.randomUUID(), title: "Dune", author: "Frank Herbert", pages: 412, isRead: true },
    { id: crypto.randomUUID(), title: "Project Hail Mary", author: "Andy Weir", pages: 496, isRead: false },
    { id: crypto.randomUUID(), title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", pages: 416, isRead: true },
    { id: crypto.randomUUID(), title: "Dom Casmurro", author: "Machado de Assis", pages: 256, isRead: true },
    { id: crypto.randomUUID(), title: "1984", author: "George Orwell", pages: 328, isRead: false },
    { id: crypto.randomUUID(), title: "Pride and Prejudice", author: "Jane Austen", pages: 432, isRead: true },
    { id: crypto.randomUUID(), title: "Crime and Punishment", author: "Fyodor Dostoevsky", pages: 671, isRead: false },
    { id: crypto.randomUUID(), title: "The Little Prince", author: "Antoine de Saint-Exupéry", pages: 96, isRead: true }
];

function Book(
    title,
    author,
    pages,
    isRead,
) {
    if (!new.target) {
        throw new Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.archieve = function () {
        myLibrary.push(this);
    }
}

function addBookToLibrary() {
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("is-read").checked;

    const newBook = new Book(title, author, pages, isRead);
    newBook.archieve();
    renderBooks();
}

function removeBookFromLibrary(e) {
    if (window.confirm("Are you sure you want to remove it from the library? This action is irreversible.")) {
        const id = e.target.closest(".card").dataset.id;
        const index = myLibrary.findIndex(book => book.id === id);
        myLibrary.splice(index, 1);
        renderBooks();
    }
}

function readBookFromLibrary(e) {
    if (window.confirm("Are you sure you want to mark this book as read? This action is irreversible.")) {
        const id = e.target.closest(".card").dataset.id;
        const index = myLibrary.findIndex(book => book.id === id);
        if (myLibrary[index].isRead) {
            alert("You already read this book!");
        } else {
            myLibrary[index].isRead = true
            renderBooks();
        }
    }
}

function renderBooks() {
    let html = '';
    for (const book of myLibrary) {
        let readStatus = 'NO';
        let markAsReadIcon = '<img src="icons/book-check.svg" class="icon read-book" alt="Mark as read" title="Mark as read">';
        if (book.isRead) {
            readStatus = 'YES';
            markAsReadIcon = '<div></div>';
        }
        html +=
            `<div class="card" data-id="${book.id}">
                <h2>${book.title}</h2>
                <ul>
                    <li>Author: ${book.author}</li>
                    <li>Read? ${readStatus}</li>
                    <li>Pages: ${book.pages}</li>
                </ul>
                <div class="book-actions">
                    ${markAsReadIcon}
                    <img src="icons/book-remove.svg" class="icon remove-book" alt="Delete from library" title="Delete from library">
                </div>
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

    modalDialog.addEventListener("close", () => {
        clearModal(modalDialog);
    })

    cancelBtn.addEventListener("click", () => {
        clearModal(modalDialog);
    });

    addBook.addEventListener("submit", (e) => {
        e.preventDefault();
        addBookToLibrary();
        clearModal(modalDialog);
    })
}

function clearModal(modalDialog) {
    modalDialog.close();
    document.getElementById("add-book").reset();
}

renderBooks();
renderModal();
