var axios = require('axios');
const bcrypt = require('bcrypt');

const getUsers = () =>
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

const addUser = async ({ username, password }) =>
	new Promise((resolve, reject) => {
		axios
			.post('http://localhost:5000/users', { username, password })
			.then((response) => {
				console.log(response.data);
				resolve('ok');
			})
			.catch((error) => {
				reject(error);
			});
	});

module.exports.signup_get = (req, res) => {
	res.render('signup');
};
module.exports.signup_post = async (req, res) => {
	const { username, password } = req.body;

	let userExists = false;
	await getUsers().then((users) => {
		users.filter((user) => (user.username === username ? (userExists = true) : false));
	});

	if (userExists) res.sendStatus(400);
	else {
		const hash = await bcrypt.hash(password, 12);

		await addUser({ username, password: hash })
			.then((response) => {
				console.log(response);
				res.sendStatus(200);
			})
			.catch((error) => console.log(error));
	}
};

module.exports.login_get = (req, res) => {
	res.render('login');
};

module.exports.login_post = async (req, res) => {
	const { username, password } = req.body;

	let foundUser;
	await getUsers().then((users) => {
		users.filter((user) => {
			if (user.username === username) {
				foundUser = user;
			}
		});
	});

	if (foundUser) {
		const match = await bcrypt.compare(password, foundUser.password);
		if (match) res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}
};
