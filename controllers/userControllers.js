require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');

const getUser = (userId) => {
	return axios
		.get(`http://localhost:5000/users/${userId}`)
		.then((response) => response.data)
		.catch((error) => console.log(error));
};

const getAuthors = () => {
	return axios
		.get(`http://localhost:5000/authors/`)
		.then((response) => response.data)
		.catch((error) => console.log(error));
};

const getBooks = async () => {
	return axios
		.get('http://localhost:5000/books/')
		.then((response) => response.data)
		.catch((error) => console.log(error));
};

const profile_get = (req, res) => {
	res.render('profile');
};

const authors_get = async (req, res) => {
	const userId = req.params.userId;

	try {
		const user = await getUser(userId);
		const authors = await getAuthors();
		const likedAuthors = authors.filter((author) => user.likedAuthors.includes(author.id));

		console.log(user);
		console.log(authors);
		console.log(user.likedAuthors);

		res.render('authors', { likedAuthors: likedAuthors });
	} catch (error) {
		console.log(error);
	}
};

const books_get = async (req, res) => {
	const authorId = req.params.authorId;
	try {
		const books = await getBooks();
		const userBooks = books.filter((book) => book.author_id === authorId);

		res.render('books', { books: userBooks });
	} catch (error) {
		console.log(error);
	}
};

const profile_redirect = (req, res) => res.redirect('/profile/' + req.cookies.userId);

module.exports = {
	profile_get,
	authors_get,
	profile_redirect,
	books_get,
};
