const { createNewClub } = require('../../db/dbClubQueries')

async function addClub(req, res) {
  const clubName = req.body.name

  try {
    clubData = await createNewClub(clubName)

    if (clubData === false) {
    res.json({
      success: false, 
      body: 'Server error. Please try again.'
    })
  } else {
    res.json({
        success: true,
        body: 'Sucessfully created new bookclub'
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

module.exports = addClub