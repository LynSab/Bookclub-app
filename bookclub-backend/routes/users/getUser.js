const { fetchUserById } = require('../../db/dbUserQueries')
const jwt = require('jsonwebtoken')

async function getUser(req, res){
  const decodedToken = jwt.decode(req.cookies.token)
  const userId = decodedToken.userId
  
  userData = await fetchUserById(userId)

  if (userData === false) {
    res.json({
      success: 'false',
      body: 'Server error. Please try again.'
    })
  } else {
    res.json({
      success: true,
      body: {name: userData.username, email: userData.email}
    })
  }
}

module.exports = getUser