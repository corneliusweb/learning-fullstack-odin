let library = [];

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

	library.push(newBook);
}
