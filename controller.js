const addBtn = document.querySelector('.add-button');
const myBooksSection = document.querySelector('.library');
const formDisplay = document.querySelector('.add-form.hide');
const form = document.querySelector('.new-book-form');
const form_title = document.querySelector('#input_title');
const form_author = document.querySelector('#input_author');
const form_pages = document.querySelector('#input_pages');
const form_hasread = document.querySelector('#read_box');
const form_submit = document.querySelector('#btn_submit');
const form_cancel = document.querySelector('.cancel');
const form_error = document.querySelector('.form-error.hide');

// prevent page from refresh after adding book.
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

// load book cards when page loads
document.addEventListener("DOMContentLoaded", () => {
    if(myLibrary.length >= 1) { loadLibraryConents() }});

let myLibrary = [
    book_1 = {
        title: "The Hobbit",
        author: "J.R.R. Tolkein",
        pages: "295",
        read: true
      }
];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    toggleRead(checkBtn) {
        if (this.read === true) {
            this.read = false;
            checkBtn.textContent = 'check_box_outline_blank';
        }
        else if (this.read === false) {
            this.read = true;
            checkBtn.textContent = 'select_check_box';
        }
    }
}

function toggleBookForm() {
    if(formDisplay.className === 'add-form hide') { 
        formDisplay.className = 'add-form show';
    }
    else if (formDisplay.className === 'add-form show'){
        formDisplay.className = 'add-form hide';
        form_error.className = 'form-error hide';
        form.reset();
      }
}

// Check field inputs since preventing default, and push to library if no error
function createBookProperties () {
    if(form_title.value == "") {
        form_error.className = "form-error show"
    }
    else if(form_author.value == "") {
        form_error.className = "form-error show"
    }
    else if(form_pages.value == ""){
        form_error.className = "form-error show"
    }
    else{
        const book_submission = new Book(form_title.value, form_author.value, form_pages.value, form_hasread.checked);
        myLibrary.push(book_submission);
        toggleBookForm(); 
        addToLibrary();
    }
}

// load contents of library upon page load
function loadLibraryConents() {
    let lib_length = myLibrary.length;
    for(let i = 0; i < lib_length; i++) {
        const book_title = myLibrary[i].title;
        const book_author = myLibrary[i].author;
        const book_pages = myLibrary[i].pages;
        const book_status = myLibrary[i].read;
        const book_index = i;
        createCardElements(book_title, book_author, book_pages, book_status, book_index);
    }
}

// Add submission to library
function addToLibrary () {
    let target_elem = myLibrary.length - 1;   
    createCardElements(myLibrary[target_elem].title, myLibrary[target_elem].author, 
        myLibrary[target_elem].pages, myLibrary[target_elem].read, target_elem);
}

// Render cards from array
function createCardElements (title, author, pages, read_status, index) {
    const card_div = document.createElement('div');
    card_div.className = "bookcard";
    card_div.id = index;
    myBooksSection.appendChild(card_div);

    const info_div = document.createElement('div');
    info_div.className = "card-info";
    card_div.appendChild(info_div);

    const title_p = document.createElement('p');
    title_p.className = "book-title";
    title_p.textContent = title;
    info_div.appendChild(title_p);

    const author_p = document.createElement('p');
    author_p.textContent = author;
    info_div.appendChild(author_p);

    const pages_p = document.createElement('p');
    pages_p.textContent = "Pages: " + pages;
    info_div.appendChild(pages_p);

    const check_div = document.createElement('div');
    check_div.className = "completion-status"
    info_div.appendChild(check_div);

    const check_label = document.createElement('label');
    check_label.htmlFor = 'card-read-box';
    check_label.textContent = 'Finished';
    check_div.appendChild(check_label);

    const check_btn = document.createElement('button');
    check_btn.className = 'material-symbols-outlined';
    check_btn.id = 'card-read-box';
    if(read_status == false) {
        check_btn.textContent = 'check_box_outline_blank';
    }
    else if (read_status == true) {
        check_btn.textContent = 'select_check_box';
    }

    const delete_btn = document.createElement('button');
    delete_btn.className = 'material-symbols-outlined delete-button';
    delete_btn.textContent = 'close';
    card_div.appendChild(delete_btn);
    delete_btn.addEventListener('click', () =>  { removeCardAndResetDisplay(index) });

    check_btn.addEventListener('click', () =>  { changeReadStatus(index, check_btn) });
    check_div.appendChild(check_btn);
}


// Change read status using prototype
function changeReadStatus(book_index, check_btn) {
    const changed_book = new Book(myLibrary[book_index].title, myLibrary[book_index].author, 
        myLibrary[book_index].pages, myLibrary[book_index].read);
    changed_book.toggleRead(check_btn);
    myLibrary[book_index] = changed_book;
    console.log(myLibrary);
}

// Removes Book card and resets display to maintain congruency between array index and corresponding element id
function removeCardAndResetDisplay(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    const cards = document.querySelectorAll('.bookcard');
    cards.forEach(bookcard => {
        bookcard.remove();
    });
    loadLibraryConents();
}

form_submit.addEventListener('click', () =>  { createBookProperties(); });
addBtn.addEventListener('click', () =>  { toggleBookForm() });
form_cancel.addEventListener('click', () =>  { toggleBookForm() });