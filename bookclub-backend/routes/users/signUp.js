const bcrypt = require('bcrypt')
const { createNewUser } = require('../../db/dbUserQueries')

async function signUp(req, res) {
  const newUser = {...req.body}

  try {
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
    
    const userCreation = await createNewUser(newUser)

    if (userCreation === false) {
      res.json({
        success: false, 
        body: 'Server error. Please try again.'
      })
    } else if (userCreation === 'Duplicate'){
      res.json({
        success: false, 
        body: 'User with this email already exists'
      })
    } else {
      res.json({
        success: true,
        body: 'Sucessfully created new user account'
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

module.exports = signUp