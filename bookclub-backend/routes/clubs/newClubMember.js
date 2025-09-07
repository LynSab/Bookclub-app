const { fetchUserByEmail } = require('../../db/dbUserQueries');
const { createNewMembership } = require('../../db/dbClubQueries');

async function addNewMember(req, res) {
  const userEmail = req.body.email;
  const clubID = req.body.club;

  const user = await fetchUserByEmail(userEmail);
  const memberDetail = {
    club: clubID,
    user: user.id
  };

  if (user === false) {
    res.json({
      success: false, 
      body: 'Server error. Please try again.'
    });
    return;
  }  
  
  if (user === undefined) {
    res.json({
      success: false, 
      body: 'User does not exist'
    }); 
    return;
  }

  const membershipData = await createNewMembership(memberDetail);

  if (membershipData === false) {
    res.json({
      success: false, 
      body: 'Server error. Please try again.'
    });
  } else {
    res.json({
      success: true,
      body: 'Sucessfully added new member to the bookclub'
    });
  }
}

module.exports = addNewMember;