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
}

const displayDiv = document.querySelector('.display');
const ol = document.querySelector('.display ol');

function displayBook(id) {
	const bookList = document.createElement('li');
	const bookInfoPara = document.createElement('p');
	bookInfoPara.innerHTML = `<span>${title.value}</span> ${author.value}, ${pages.value}, ${pub.value} ${year.value}.`;

	const deleteBtn = document.createElement('button');
	deleteBtn.textContent = 'x';

	// create deleteBtn attributes
	const delBtnAttrs = {
		'data-id': id,
		class: 'del-btn',
	};
	Object.entries(delBtnAttrs).forEach(([key, value]) => {
		deleteBtn.setAttribute(key, value);
	});

	// create read status elems
	const readStatusPara = document.createElement('p');
	const readStatusBtn = document.createElement('button');
	readStatusBtn.textContent = 'Mark read';

	// create para and btn divs to group them for flex
	const paraDiv = document.createElement('div');
	const btnDiv = document.createElement('div');

	paraDiv.appendChild(bookInfoPara);
	paraDiv.appendChild(readStatusPara);

	btnDiv.appendChild(deleteBtn);
	btnDiv.appendChild(readStatusBtn);

	bookList.appendChild(paraDiv);
	bookList.appendChild(btnDiv);

	ol.appendChild(bookList);
}

// get modal elems

const modal = document.querySelector('.modal');

const newBookBtn = document.querySelector('.new-book-btn');
newBookBtn.addEventListener('click', () => (modal.style.display = 'block'));
