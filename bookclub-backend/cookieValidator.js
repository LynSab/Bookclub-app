const jwt = require('jsonwebtoken');

function cookieValidator(cookies) {
  try {
    console.log('cookie validation');
    const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
    console.log(decoded);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

function validateCookies(req, res, next) {
  const cookie = cookieValidator(req.cookies);
  
  if (cookie) {
    next();
  } else {
    res.json({cookieError: 'invalid cookie'});
  }
}

module.exports = { cookieValidator, validateCookies };