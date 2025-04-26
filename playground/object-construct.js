function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.info = function () {
	return `${this.title} by ${this.author}, ${this.pages}. ${
		this.read ? 'Book is read' : 'Book is not yet read'
	}`;
};

const book1 = new Book('Learning how to Learn', 'C.C Asogwa', 234, false);
const book2 = new Book('Learning how to Learn', 'C.C Asogwa', 234, true);
// console.log(book1.info());

// legacy way
const obj = {
	title: 'Not Learning how to Learn',
	author: 'Karen',
	pages: 123,
	read: true,
	info: () => {
		return `${obj.title} by ${obj.author}`;
	},
};

// console.log(obj.info());

function Player(name, marker) {
	if (!new.target) {
		throw Error('Include "new" before object');
	}
	this.name = name;
	this.marker = marker;
}

const player1 = new Player('Jenn', 'X');
const player2 = new Player('Tim', 'O');
// console.log(player2);

// console.log(Object.getPrototypeOf(Player.prototype) === Object.prototype);
// console.log(Object.prototype.hasOwnProperty('valueOf'));
// console.log(Object.getPrototypeOf(player1) === Player.prototype);

// chatGPT hands-on exercise: Family Inheritance

//WITH PLAIN OBJECT
const grandDad = { land: true };

let dad = Object.create(grandDad);
dad.house = true;

let me = Object.create(dad);
me.car = true;
me.wife = true;

let myChild = Object.create(me);

grandDad.getHeritage = function () {
	return this.land;
};

// console.log(myChild.getHeritage());

function Hero(name, level) {
	this.name = name;
	this.level = level;
}

function Warrior(name, level, weapon) {
	Hero.call(this, name, level);
	this.weapon = weapon;
}

function Healer(name, level, spell) {
	Hero.call(this, name, level);
	this.spell = spell;
}

Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Object.setPrototypeOf(Healer.prototype, Hero.prototype)

Warrior.prototype.attack = function () {
	return `${this.name} attacks with ${this.weapon}`;
};

Hero.prototype.greet = function () {
	return `${this.name} greets you!`;
};

const hero1 = new Warrior('jammy', 34, 'brain');

console.log(hero1.greet());
