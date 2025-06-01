const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { fetchUserByEmail } = require('../../db/dbUserQueries')

async function login(req, res) {
  console.log('hello')
  const loginEmail = req.body.email
  const loginPass = req.body.password

  const userData = await fetchUserByEmail(loginEmail)

  if (userData === false) {
    res.json({
      success: false, 
      body: 'Server error. Please try again.'
    })
  } else if (userData === undefined) {
    res.json({
      success: false, 
      body: 'Username and/or password incorrect.'
    })
  } else {
    try {
      const passwordMatch = await bcrypt.compare(loginPass, userData.password)

      if (passwordMatch) {
        const token = jwt.sign({userId: userData.id}, process.env.JWT_SECRET, {expiresIn: 604800000})
        res.cookie('token', token, {httpOnly: true})
          .json({
            success: true, 
            body: {
              id: userData.id, 
              username: userData.username
            }
          })
      } else {
        res.json({
          success: false, 
          body: 'Username and/or password incorrect.'
        })
      }
    } catch(err) {
      console.log(err)
      res.json({
        success: false, 
        body: 'Server error. Please try again.'
      })
    }
  }
}

module.exports = login