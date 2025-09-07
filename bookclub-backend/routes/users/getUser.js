const { fetchUserById } = require('../../db/dbUserQueries');
const jwt = require('jsonwebtoken');

async function getUser(req, res){
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  
  const userData = await fetchUserById(userId);

  if (userData === false) {
    res.json({
      success: 'false',
      body: 'Server error. Please try again.'
    });
  } else {
    res.json({
      success: true,
      body: {name: userData.username, email: userData.email}
    });
  }
}

module.exports = getUser;