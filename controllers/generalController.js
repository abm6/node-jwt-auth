require('dotenv').config();
const {getManyBooks} = require('../utils/helper.controller.axios');


const gallery_get = async (req, res) => {
  const books = await getManyBooks();
	res.render('gallery', { books: books });
};

const home_get = (req, res) => {
	res.render('home');
};

module.exports = {
	gallery_get,
	home_get,
};
