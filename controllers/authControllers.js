const { secret, maxTokenAge } = require('../config/tokenConfig');
const {getManyUsers, addOneUser } = require('../utils/helper.controller.axios');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (id) => jwt.sign({ id }, secret, { expiresIn: maxTokenAge });

const signup_get = (req, res) => {
	res.render('signup');
};

const signup_post = async (req, res) => {
	const { username, password, fullname, email, age, profession, gender } = req.body;
	console.log('BODY');
	console.log(req.body);

	let userExists = false;
	await getManyUsers().then((users) => {
		users.filter((user) => (user.username === username ? (userExists = true) : false));
	});

	if (userExists) res.sendStatus(400);
	else {
		const hash = await bcrypt.hash(password, 12);

		await addOneUser({ username: username, password: hash })
			.then((data) => {
				const token = createToken(data.id);
				res.cookie('jwt', token, { httpOnly: true, maxAge: maxTokenAge * 1000 });
				res.cookie('userId', data.id);
				res.sendStatus(200);
			})
			.catch((error) => console.log(error));
	}
};

const login_get = (req, res) => {
	res.render('login');
};

const login_post = async (req, res) => {
	const { username, password } = req.body;

	let foundUser;
	await getManyUsers().then((users) => {
		users.filter((user) => {
			if (user.username === username) {
				foundUser = user;
			}
		});
	});

	if (foundUser) {
		const match = await bcrypt.compare(password, foundUser.password);
		if (match) {
			const token = createToken(foundUser.id);
			res.cookie('jwt', token, { httpOnly: true, maxAge: maxTokenAge * 1000 });
			res.cookie('userId', foundUser.id);
			res.sendStatus(200);
		}
	} else {
		res.sendStatus(400);
	}
};

const logout_get = (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 });
	res.cookie('userId', '', { maxAge: 1 });
	res.redirect('/');
};

module.exports = {
	signup_get,
	signup_post,
	login_get,
	login_post,
	logout_get,
};
