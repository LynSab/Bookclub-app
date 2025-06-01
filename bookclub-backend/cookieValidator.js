const jwt = require('jsonwebtoken')

async function cookieValidator(cookies) {
  try {
    console.log('cookie validation')
    const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET)
    console.log(decoded)
  } catch (err) {
      const error = 'Invalid cookies'
      throw error
  }
}

async function validateCookies(req, res, next) {
  await cookieValidator(req.cookies)
  next()
}

module.exports = validateCookies