const form = document.querySelector('form');
const modal = document.querySelector('.modal');
const newBookBtn = document.querySelector('.new-book-btn');

let myLibrary = [];

form.addEventListener('submit', (e) => {
	e.preventDefault();
});

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
	form.reset();
}

newBookBtn.addEventListener('click', () => {
	modal.style.display = 'block';
});

// get input DOM references
const titleEl = document.querySelector('#title');
const authorEl = document.querySelector('#author');
const pagesEl = document.querySelector('#pages');
const publisherEl = document.querySelector('#publisher');
const yearEl = document.querySelector('#year');
const readInModal = document.querySelector('.modal .yes'); // read checkbox inside of modal

const modalBtns = document.querySelector('.modal .btns');

modalBtns.addEventListener('click', (event) => {
	if (event.target.classList.contains('cancel')) {
		modal.style.display = 'none';
	} else if (event.target.classList.contains('add-book')) {
		//
		if (
			titleEl.value &&
			authorEl.value &&
			pagesEl.value &&
			publisherEl.value &&
			yearEl.value
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
	const readBtn = document.createElement('button');

	readBtn.className = 'read-btn';
	readBtn.textContent = 'Read';
	deleteBtn.setAttribute('data-list', id);
	deleteBtn.textContent = 'X';
	deleteBtn.className = 'delete-btn';

	span.textContent = `${titleEl.value} `; // to allow italicizing of titles
	para.textContent = ` by ${authorEl.value}, ${pagesEl.value}, ${publisherEl.value} ${yearEl.value}.`;

	para.prepend(span);
	div.appendChild(para);
	div.appendChild(readBtn);
	div.appendChild(deleteBtn);
	display.appendChild(div);

	deleteBtn.addEventListener('click', (event) => {
		const bookId = event.target.getAttribute('data-list');

		myLibrary = myLibrary.filter((book) => book.id !== bookId);

		div.remove();
	});

	//reset radio btn
	if (readInModal.checked === true) {
		const no = document.querySelector('.modal .no');
		no.checked = true;
	}
}
