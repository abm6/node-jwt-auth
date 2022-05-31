const axios = require('axios');

const getOneUser = (userId) => {
	return axios
		.get(`http://localhost:5000/users/${userId}`)
		.then((response) => response.data)
		.catch((error) => console.log(error));
};

const getManyAuthors = () => {
	return axios
		.get(`http://localhost:5000/authors/`)
		.then((response) => response.data)
		.catch((error) => console.log(error));
};

const getManyBooks = async () => {
	return axios
		.get('http://localhost:5000/books/')
		.then((response) => response.data)
		.catch((error) => console.log(error));
};


const getManyUsers = () =>
	new Promise((resolve, reject) => {
		axios
			.get('http://localhost:5000/users')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});

const addOneUser = async ({ username, password }) =>
	new Promise((resolve, reject) => {
		axios
			.post('http://localhost:5000/users', { username, password, likedAuthors: [] })
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});


module.exports = {
	getOneUser,
  getManyUsers,
	getManyAuthors,
	getManyBooks,
  addOneUser,
};
