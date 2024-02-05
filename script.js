const catalogue = document.querySelector(".book-catalogue");
const addBookButton = document.querySelector(".btnAdd");
const dialog = document.querySelector("dialog");
const modalCancelButton = document.querySelector(".modal-cancel");
const modalAddButton = document.querySelector(".modal-add");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pageInput = document.querySelector("#page");

const cards = []


const myLibrary = []


addBookButton.addEventListener('click', e => {
    dialog.showModal();
});

modalCancelButton.addEventListener('click', e => {
    dialog.close();
})

modalAddButton.addEventListener('click', e => {
    if(titleInput.value == "" || authorInput.value == "" || pageInput.value == "") return;

    let book = new Book(titleInput.value, authorInput.value, pageInput.valueAsNumber);

    titleInput.value = "";
    authorInput.value = "";
    pageInput.value = "";

    addBookToLibrary(book);
    dialog.close();
})

function readButtonEvent(event) {
    bookIndex = cards.indexOf(event.target.parentNode) ;
    
    myLibrary[bookIndex].toggleRead();
    
    if (myLibrary[bookIndex].read) {
        event.target.style.background = 'rgb(125, 209, 125)';
        event.target.textContent = "Read";
    } else {
        event.target.style.background = 'salmon';
        event.target.textContent = "Not Read";
    }

}

function removeButtonEvent(event) {
    bookIndex = cards.indexOf(event.target.parentNode);
    
    myLibrary.splice(bookIndex, 1);
    cards.splice(bookIndex, 1);

    catalogue.removeChild(event.target.parentNode);
}

function Book(title, author, pageNum, read = false) {
    this.title = title
    this.author = author
    this.pageNum = pageNum
    this.read = read
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    createBookCard(book);
}

function createBookCard(book) {
    catalogue.innerHTML += `<div class="book-card">
    <div class="book-title">${book.title}</div>
    <div class="book-author">${book.author}</div>
    <div class="book-page">${book.pageNum} pages</div>
    <button class="btnRead">Not Read</button>
    <button class="btnRemove">Remove</button>
</div>`;
    lastBook = catalogue.lastChild;
    lastReadButton = catalogue.querySelector(".btnRead");
    lastRemoveButton = catalogue.querySelector(".btnRemove");
    
    // readButtons.push(lastReadButton);
    // readButtons.push(lastRemoveButton);

    cards.push(lastReadButton.parentNode);

    lastReadButton.addEventListener('click', readButtonEvent);
    lastRemoveButton.addEventListener('click', removeButtonEvent);

}

myLibrary.push(new Book("Da Vinci Code", "Dan Brown", 400, false));

myLibrary.forEach(book => {
    createBookCard(book);
});