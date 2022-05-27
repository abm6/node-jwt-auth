require('dotenv').config();
const secret = process.env.SECRET;
const maxTokenAge = 60 * 60;

module.exports = {
	secret,
	maxTokenAge,
};
