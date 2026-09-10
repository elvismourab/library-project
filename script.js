class Book {

    constructor(title, author, pages, isRead) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }

}

const myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", 310, true),
    new Book("Neuromancer", "William Gibson", 271, false),
    new Book("Crime and Punishment", "Fyodor Dostoevsky", 671, false),
    new Book("Dom Casmurro", "Machado de Assis", 256, true),
    new Book("1984", "George Orwell", 328, false),
    new Book("To Kill a Mockingbird", "Harper Lee", 281, true),
    new Book("Pride and Prejudice", "Jane Austen", 279, false),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
    new Book("Moby-Dick", "Herman Melville", 635, false),
    new Book("The Catcher in the Rye", "J.D. Salinger", 234, true),
    new Book("The Alchemist", "Paulo Coelho", 163, true),
    new Book("Fahrenheit 451", "Ray Bradbury", 158, false),
    new Book("The Little Prince", "Antoine de Saint-Exupéry", 96, true),
    new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, false),
    new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, true),
    new Book("The Chronicles of Narnia", "C.S. Lewis", 768, false),
    new Book("Brave New World", "Aldous Huxley", 268, false),
    new Book("Animal Farm", "George Orwell", 112, true),
    new Book("The Picture of Dorian Gray", "Oscar Wilde", 254, false),
    new Book("The Metamorphosis", "Franz Kafka", 201, true),
    new Book("Dracula", "Bram Stoker", 418, false),
    new Book("Frankenstein", "Mary Shelley", 280, true),
    new Book("Jane Eyre", "Charlotte Brontë", 532, false),
    new Book("Wuthering Heights", "Emily Brontë", 416, false),
    new Book("Les Misérables", "Victor Hugo", 1463, false),
    new Book("The Count of Monte Cristo", "Alexandre Dumas", 1276, false),
    new Book("Anna Karenina", "Leo Tolstoy", 864, false),
    new Book("War and Peace", "Leo Tolstoy", 1225, false),
    new Book("The Brothers Karamazov", "Fyodor Dostoevsky", 796, false),
    new Book("The Odyssey", "Homer", 541, false),
    new Book("The Iliad", "Homer", 683, false),
    new Book("Don Quixote", "Miguel de Cervantes", 863, false),
    new Book("One Hundred Years of Solitude", "Gabriel García Márquez", 417, true),
    new Book("The Da Vinci Code", "Dan Brown", 489, true),
    new Book("The Kite Runner", "Khaled Hosseini", 371, true),
    new Book("Life of Pi", "Yann Martel", 326, false),
    new Book("The Book Thief", "Markus Zusak", 552, true),
    new Book("The Fault in Our Stars", "John Green", 313, true),
    new Book("Dune", "Frank Herbert", 412, false),
    new Book("Foundation", "Isaac Asimov", 255, false),
    new Book("Ender's Game", "Orson Scott Card", 324, true),
    new Book("The Hunger Games", "Suzanne Collins", 374, true),
    new Book("Twilight", "Stephenie Meyer", 498, false),
    new Book("Percy Jackson & the Olympians: The Lightning Thief", "Rick Riordan", 377, true),
    new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 423, true),
    new Book("The Two Towers", "J.R.R. Tolkien", 352, true),
    new Book("The Return of the King", "J.R.R. Tolkien", 416, true),
    new Book("Memórias Póstumas de Brás Cubas", "Machado de Assis", 296, true),
    new Book("O Cortiço", "Aluísio Azevedo", 244, false),
    new Book("Vidas Secas", "Graciliano Ramos", 176, true)
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
