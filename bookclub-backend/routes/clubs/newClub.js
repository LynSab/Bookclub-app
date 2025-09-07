const { createNewClub } = require('../../db/dbClubQueries');
const jwt = require('jsonwebtoken');

async function addClub(req, res) {
  console.log('here');
  const clubName = req.body.name;
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;

  const clubData = await createNewClub(clubName, userId);

  if (clubData === false) {
    res.json({
      success: false, 
      body: 'Server error. Please try again.'
    });
  } else if (clubData === 'Duplicate'){
    res.json({
      success: false, 
      body: 'Club with this name already exists'
    });
  } else {
    res.json({
      success: true,
      body: 'Sucessfully created new bookclub'
    });
  }
}

module.exports = addClub;