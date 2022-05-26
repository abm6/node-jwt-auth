const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const PORT = 3000 | process.env.PORT;
// const { getUsers } = require('./controller/userController');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');

app.use(logger('dev'));
// app.use(cookieParser());
// app.use(session({ secret: 'loginsecret', resave: true, saveUninitialized: true, cookie: { secure: true } }));

// all express configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware

//routes

app.get('/', (req, res) => {
	res.render('home');
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
