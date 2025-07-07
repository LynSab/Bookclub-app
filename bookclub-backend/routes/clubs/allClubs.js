const { fetchClubsByMembership } = require('../../db/dbClubQueries')
const jwt = require('jsonwebtoken')

async function allClubs(req, res){
  const decodedToken = jwt.decode(req.cookies.token)
  const userId = decodedToken.userId
  const bookclubs = await fetchClubsByMembership(userId)

  if (bookclubs) {
    const clubNames = bookclubs.map(function(bookclub){
      return {name: bookclub.name, id: bookclub.id }
    })
    console.log('Club endpoint')
    res.json(clubNames)
  } else {
    res.json({
      success: false,
      body: 'Server error. Please try again.'
    })
  }
}

module.exports = allClubs