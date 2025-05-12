let myLibrary = [];

function Book(title, author, pages, pub, year, id) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.pub = pub;
	this.year = year;
	this.id = id;
	this.read = false;
}

// set toggle read proto
Book.prototype.toggleRead = function () {
	this.read = !this.read;
};

// get input elems

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const pub = document.getElementById('publisher');
const year = document.getElementById('year');

function addBookToLibrary(title, author, pages, pub, year) {
	const id = crypto.randomUUID(); // generate unique id
	const newBook = new Book(title, author, pages, pub, year, id);

	myLibrary.push(newBook);
	displayBook(id);
}

const displayDiv = document.querySelector('.display');
const ol = document.querySelector('.display ol');

function displayBook(id) {
	const bookList = document.createElement('li');
	const bookInfoPara = document.createElement('p');
	const bookInfoText = document.createElement('span');
	bookInfoText.innerHTML = `<em>${title.value}</em> ${author.value}, ${pages.value} pages, ${pub.value} ${year.value}.`;

	const deleteBtn = document.createElement('button');
	deleteBtn.textContent = 'X';

	// create deleteBtn attributes
	const delBtnAttrs = {
		'data-id': id,
		class: 'del-btn',
	};
	Object.entries(delBtnAttrs).forEach(([key, value]) => {
		deleteBtn.setAttribute(key, value);
	});

	deleteBtn.addEventListener('click', (e) => {
		const bookId = e.target.getAttribute('data-id');
		myLibrary = myLibrary.filter((book) => book.id !== bookId);
		bookList.remove();
	});

	// create read status elems
	const readStatusPara = document.createElement('p');
	const readStatusText = document.createElement('span');

	const readStatusBtn = document.createElement('button');
	readStatusBtn.textContent = 'Mark as read';
	readStatusBtn.setAttribute('data-id', id);

	readStatusBtn.addEventListener('click', (e) => {
		const readBookId = e.target.getAttribute('data-id');
		myLibrary.map((book) => {
			if (book.id === readBookId) {
				book.toggleRead();
			}

			if (book.read === true) {
				readStatusText.textContent = 'You have read this book';
				readStatusBtn.textContent = 'Mark not read';
			} else if (book.read === false) {
				readStatusText.textContent = 'You have not read this book';
				readStatusBtn.textContent = 'Mark as read';
			}
		});
	});

	bookInfoPara.prepend(bookInfoText);
	readStatusPara.prepend(readStatusText);
	bookInfoPara.appendChild(deleteBtn);
	readStatusPara.appendChild(readStatusBtn);

	bookList.appendChild(bookInfoPara);
	bookList.appendChild(readStatusPara);

	ol.appendChild(bookList);
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => e.preventDefault());

// get modal elems

const modal = document.querySelector('.modal');

const newBookBtn = document.querySelector('.new-book-btn');
newBookBtn.addEventListener(
	'click',
	() => ((modal.style.display = 'block'), form.reset())
);

const modalBtns = document.querySelector('.modal-btns');
modalBtns.addEventListener('click', (e) => {
	if (e.target.classList.contains('add-book')) {
		if (
			[title.value, author.value, pages.value, pub.value, year.value].every(
				Boolean
			)
		) {
			addBookToLibrary(
				title.value,
				author.value,
				pages.value,
				pub.value,
				year.value
			);
			modal.style.display = 'none';
		}
	} else if (e.target.classList.contains('cancel')) {
		modal.style.display = 'none';
	}
});
