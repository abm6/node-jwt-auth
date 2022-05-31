require('dotenv').config();
const axios = require('axios');
const { getOneUser, getManyAuthors, getManyBooks } = require('../utils/helper.controller.axios');

const profile_get = (req, res) => {
	res.render('profile');
};

const authors_get = async (req, res) => {
	const userId = req.params.userId;

	try {
		const user = await getOneUser(userId);
		const authors = await getManyAuthors();
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
		const books = await getManyBooks();
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
