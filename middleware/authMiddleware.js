require('dotenv').config();

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	// check json web token exists and is verified
	if (token) {
		jwt.verify(token, secret, (err,decodedToken) => {
      if(err){
        console.log(err.message)
        res.redirect("/login")
      }
      else {
        console.log(decodedToken);
        next();
      }
    });
	} else {
		res.redirect('/login');
	}
};


module.exports = {requireAuth};