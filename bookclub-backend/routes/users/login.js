const data = require('../../dummy-users')

function login(req, res) {
  const loginEmail = req.body.email
  const loginPass = req.body.password
  let loggedInUser

  for (record of data) {
    if (loginEmail == record.email && loginPass == record.password) {
      loggedInUser = record
      break
    }
  }

  if (loggedInUser) {
    res.json({success: true, body: loggedInUser})
  } else {
    res.json({success: false, body: 'Username and/or password incorrect.'})
  }
}

module.exports = login