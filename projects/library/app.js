let myLibrary = [];

class Book {
	constructor(title, author, pages, pub, year, id) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.pub = pub;
		this.year = year;
		this.id = id;
		this.read = false;
	}

	toggleRead() {
		this.read = !this.read;
	}
}

// get input elems

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const pub = document.getElementById('publisher');
const year = document.getElementById('year');

function addBookToLibrary(title, author, pages, pub, year) {
	const newBook = new Book(
		title,
		author,
		pages,
		pub,
		year,
		crypto.randomUUID()
	);

	myLibrary.push(newBook);
	displayBook(newBook);
}

const displayDiv = document.querySelector('.display');
const ol = document.querySelector('.display ol');

function displayBook(book) {
	const bookList = document.createElement('li');
	const bookInfoPara = document.createElement('p');
	const bookInfoText = document.createElement('span');
	bookInfoText.innerHTML = `<em>${book.title}</em> by ${book.author}, ${book.pages} pages, ${book.pub} ${book.year}.`;

	const deleteBookBtn = document.createElement('button');
	deleteBookBtn.textContent = 'X';

	// create & set deleteBookBtn attributes
	const delBtnAttrs = {
		'data-id': book.id,
		class: 'del-btn',
	};
	Object.entries(delBtnAttrs).forEach(([key, value]) => {
		deleteBookBtn.setAttribute(key, value);
	});

	// get delete modal elems
	const deleteWarnModal = document.querySelector('.delete-modal');
	const deleteWarnBtns = document.querySelector('.delete-modal-btns');
	const deletedBookInfo = document.querySelectorAll('.book-info');
	const deletedBookNotif = document.querySelector('.delete-notice');

	deleteBookBtn.addEventListener('click', () => {
		deletedBookInfo.forEach((para) => (para.textContent = book.title));
		deleteWarnModal.style.display = 'block';

		deleteWarnBtns.addEventListener('click', (e) => {
			if (e.target.classList.contains('delete')) {
				const bookId = e.target.getAttribute('data-id');
				myLibrary = myLibrary.filter((b) => b.id !== bookId);
				bookList.remove();
				deleteWarnModal.style.display = 'none';
				deletedBookNotif.style.display = 'block';

				// hide delete notif after 3s
				setTimeout(() => {
					deletedBookNotif.style.display = 'none';
				}, 3000);
			} else if (e.target.classList.contains('cancel')) {
				deleteWarnModal.style.display = 'none';
			}
		});
	});

	// create read status elems
	const readStatusPara = document.createElement('p');
	const readStatusText = document.createElement('span');
	readStatusText.className = 'read-text';

	const readStatusBtn = document.createElement('button');
	readStatusBtn.textContent = 'Mark as read';

	readStatusBtn.addEventListener('click', () => {
		book.toggleRead();

		if (book.read) {
			readStatusText.textContent = 'You have read this book ✅';
			readStatusBtn.textContent = 'Mark not read';
		} else {
			readStatusText.textContent = 'You have not read this book ❌';
			readStatusBtn.textContent = 'Mark as read';
		}
	});

	const readYes = document.querySelector('.modal #yes');

	if (readYes.checked) {
		readStatusText.textContent = 'You have read this book ✅';
		readStatusBtn.textContent = 'Mark not read';
		book.toggleRead();
	} else {
		readStatusText.textContent = 'You have not read this book ❌';
		readStatusBtn.textContent = 'Mark as read';
	}

	bookInfoPara.prepend(bookInfoText);
	readStatusPara.prepend(readStatusText);
	bookInfoPara.appendChild(deleteBookBtn);
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
