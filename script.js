const myLibrary = [
    { id: crypto.randomUUID(), title: "The Hobbit", author: "J.R.R. Tolkien", number: 1, isReaded: true },
    { id: crypto.randomUUID(), title: "Neuromancer", author: "William Gibson", number: 2, isReaded: false },
    { id: crypto.randomUUID(), title: "Dune", author: "Frank Herbert", number: 3, isReaded: true },
    { id: crypto.randomUUID(), title: "Project Hail Mary", author: "Andy Weir", number: 4, isReaded: false },
    { id: crypto.randomUUID(), title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", number: 5, isReaded: true }
];

function Book(
    title,
    author,
    number,
    isReaded,
) {
    if (!new.target) {
        throw new Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.number = number;
    this.isReaded = isReaded;
}

function addBookToLibrary() {
    // take params, create a book then store it in the array
    console.log("book added");
}

function renderBooks() {
    let html = '';
    for (const book of myLibrary) {
        html +=
            `<div class="card" data-id="${book.id}">
            <h2>${book.title}</h2>
            <ul>
                <li>${book.author}</li>
                <li>${book.isReaded}</li>
                <li>${book.number}</li>
            </ul>
        </div>`;
    }

    const bookshelf = document.getElementById("bookshelf");
    bookshelf.innerHTML = html; // xss !!!
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
