const modal = document.querySelector('.modal');
const newBookBtn = document.querySelector('.new-book-btn');

let myLibrary = [];

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
	displayNewBook(id);
	clearInputs();
}

newBookBtn.addEventListener('click', () => {
	modal.style.display = 'block';
});

document
	.querySelector('form')
	.addEventListener('submit', (e) => e.preventDefault());

// get input DOM references
const titleEl = document.querySelector('#title');
const authorEl = document.querySelector('#author');
const pagesEl = document.querySelector('#pages');
const publisherEl = document.querySelector('#publisher');
const yearEl = document.querySelector('#year');
const read = document.querySelector('.modal .yes');

const modalBtns = document.querySelector('.modal .btns');

modalBtns.addEventListener('click', (event) => {
	if (event.target.classList.contains('cancel')) {
		modal.style.display = 'none';
	} else if (event.target.classList.contains('add-book')) {
		//
		if (
			titleEl.value !== '' &&
			authorEl.value !== '' &&
			pagesEl.value !== '' &&
			publisherEl.value !== '' &&
			yearEl.value !== ''
		) {
			addBookToLibrary(
				titleEl.value,
				authorEl.value,
				pagesEl.value,
				publisherEl.value,
				yearEl.value
			);
			modal.style.display = 'none';
		}
	}
});

const display = document.querySelector('.display');

function displayNewBook(id) {
	const div = document.createElement('div');
	const para = document.createElement('p');
	const span = document.createElement('span');
	const deleteBtn = document.createElement('button');

	deleteBtn.setAttribute('data-list', id);
	deleteBtn.textContent = 'X';
	deleteBtn.className = 'delete-btn';

	span.textContent = `${titleEl.value} `; // to allow italicizing of titles
	para.textContent = ` by ${authorEl.value}, ${pagesEl.value}, ${
		publisherEl.value
	} ${yearEl.value}. ${
		read.checked ? 'You have read this book' : "You haven't read this book"
	}`;

	para.prepend(span);
	div.appendChild(para);
	div.appendChild(deleteBtn);
	display.appendChild(div);

	deleteBtn.addEventListener('click', (event) => {
		const bookId = event.target.getAttribute('data-list');

		myLibrary = myLibrary.filter((book) => book.id !== bookId);

		div.remove();
	});

	//reset radio btn
	if (read.checked === true) {
		const no = document.querySelector('.modal .no');
		no.checked = true;
	}
}

function clearInputs() {
	titleEl.value = '';
	authorEl.value = '';
	pagesEl.value = '';
	publisherEl.value = '';
	yearEl.value = '';
}
