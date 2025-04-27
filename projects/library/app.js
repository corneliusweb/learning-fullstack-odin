const display = document.querySelector('.display');
const modal = document.querySelector('.modal');
const newBookBtn = document.querySelector('.new-book-btn');

const myLibrary = [];

function Book(title, author, pages, publisher, year, id) {
	if (!new.target) {
		throw Error('Must create Book instances with "new');
	}
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.publisher = publisher;
	this.year = year;
	this.id = id;
}

function addBookToLibrary(title, author, pages, publisher, year) {
	const id = crypto.randomUUID(); // generate unique id
	const newBook = new Book(title, author, pages, publisher, year, id);

	myLibrary.push(newBook);
}

newBookBtn.addEventListener('click', () => {
	modal.style.display = 'block';
});

const modalBtns = document.querySelector('.modal .btns');
document
	.querySelector('form')
	.addEventListener('submit', (e) => e.preventDefault());

// get input DOM references
const titleEl = document.querySelector('#title');
const authorEl = document.querySelector('#author');
const pagesEl = document.querySelector('#pages');
const publisherEl = document.querySelector('#publisher');
const yearEl = document.querySelector('#year');

modalBtns.addEventListener('click', (event) => {
	if (event.target.classList.contains('cancel')) {
		modal.style.display = 'none';
	} else if (event.target.classList.contains('add-book')) {
		//
		addBookToLibrary(
			titleEl.value,
			authorEl.value,
			pagesEl.value,
			publisherEl.value,
			yearEl.value
		);
	}
});
