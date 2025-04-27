const display = document.querySelector('.display');
const modal = document.querySelector('.modal');
const newBookBtn = document.querySelector('.new-book-btn');

const myLibrary = [];

function Book(title, author, pages, publisher, year, id) {
	if (!new.target) {
		throw Error('Must call instances Book with "new');
	}
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.publisher = publisher;
	this.year = year;
	this.id = id;
}

newBookBtn.addEventListener('click', () => {
	modal.style.display = 'block';
});

const modalBtns = document.querySelector('.modal .btns');

modalBtns.addEventListener('click', (event) => {
	if (event.target.classList.contains('cancel')) {
		modal.style.display = 'none';
	} else if (event.target.classList.contains('add-book')) {
		//
	}
});
