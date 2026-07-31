function Book(title, author, pages, isRead) {
    if (!new.target) {
        throw new Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
    this.isRead = !this.isRead;
};

const myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", 310, true),
    new Book("Neuromancer", "William Gibson", 271, false),
    new Book("Crime and Punishment", "Fyodor Dostoevsky", 671, false),
    new Book("Dom Casmurro", "Machado de Assis", 256, true),
    new Book("1984", "George Orwell", 328, false),
];

function addBookToLibrary() {
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("is-read").checked;

    const newBook = new Book(title, author, Number(pages), isRead);
    myLibrary.push(newBook);
    renderTable();
}

function removeBookFromLibrary(id) {
    if (window.confirm("Are you sure you want to remove it from the library? This action is irreversible.")) {
        const index = myLibrary.findIndex(book => book.id === id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
            renderTable();
        }
    }
}

function renderTable() {
    const tBody = document.getElementById("library-body");
    tBody.textContent = '';

    const fragment = document.createDocumentFragment();

    for (const book of myLibrary) {
        const tr = document.createElement("tr");
        tr.dataset.id = book.id;

        const title = document.createElement("td");
        title.textContent = book.title;

        const author = document.createElement("td");
        author.textContent = book.author;

        const pages = document.createElement("td");
        pages.textContent = book.pages;

        const isRead = document.createElement("td");
        isRead.textContent = book.isRead ? "✔️" : "❌";

        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("book-actions");

        const markAsReadIcon = document.createElement("img");
        markAsReadIcon.src = book.isRead ? "icons/book-remove.svg" : "icons/book-check.svg";
        markAsReadIcon.classList.add("icon", "read-book");
        if (book.isRead) {
            markAsReadIcon.classList.add("is-read");
        }
        markAsReadIcon.alt = book.isRead ? "Mark as unread" : "Mark as read";
        markAsReadIcon.title = book.isRead ? "Mark as unread" : "Mark as read";

        const removeIcon = document.createElement("img");
        removeIcon.src = "icons/trash-can.svg";
        removeIcon.classList.add("icon", "remove-book");
        removeIcon.alt = "Delete from library";
        removeIcon.title = "Delete from library";

        actionsDiv.appendChild(markAsReadIcon);
        actionsDiv.appendChild(removeIcon);

        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(pages);
        tr.appendChild(isRead);
        tr.appendChild(actionsDiv);
        fragment.appendChild(tr);
    }

    tBody.appendChild(fragment);

}

function initEvents() {
    const bookshelf = document.getElementById("bookshelf");

    bookshelf.addEventListener("click", (e) => {
        const removeBtn = e.target.closest(".remove-book");
        const readBtn = e.target.closest(".read-book");
        const tr = e.target.closest("tr");

        if (!tr) return;
        const id = tr.dataset.id;
        const book = myLibrary.find(b => b.id === id);

        if (removeBtn) {
            removeBookFromLibrary(id);
        } else if (readBtn && book) {
            book.toggleRead();
            renderTable();
        }
    });

    renderModal();
}

function renderModal() {
    const showDialog = document.getElementById("show-dialog");
    const modalDialog = document.getElementById("modal-dialog");
    const addBook = document.getElementById("add-book");
    const cancelBtn = document.getElementById("cancel");

    showDialog.addEventListener("click", () => {
        modalDialog.showModal();
    });

    modalDialog.addEventListener("close", () => {
        clearModal(modalDialog);
    });

    cancelBtn.addEventListener("click", () => {
        clearModal(modalDialog);
    });

    addBook.addEventListener("submit", (e) => {
        e.preventDefault();
        addBookToLibrary();
        clearModal(modalDialog);
    });
}

function clearModal(modalDialog) {
    modalDialog.close();
    document.getElementById("add-book").reset();
}

renderTable();
initEvents();
