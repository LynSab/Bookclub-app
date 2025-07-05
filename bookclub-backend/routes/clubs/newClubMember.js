const { fetchUserByEmail } = require('../../db/dbUserQueries')
const { createNewMembership } = require('../../db/dbClubQueries')

async function addNewMember(req, res) {
  userEmail = req.body.email
  clubID = req.body.club
  try{
    user = await fetchUserByEmail(userEmail)
    memberDetail = {
      club: clubID,
      user: user.id
    }
    if (user === false) {
      res.json({
        success: false, 
        body: 'Server error. Please try again.'
      })
      return
    }  
    
    if (user === undefined) {
      res.json({
        success: false, 
        body: 'User does not exist'
      }) 
      return
    }

    membershipData = await createNewMembership(memberDetail)

    if (membershipData === false) {
    res.json({
      success: false, 
      body: 'Server error. Please try again.'
    })
  } else {
    res.json({
        success: true,
        body: 'Sucessfully added new member to the bookclub'
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

module.exports = addNewMember