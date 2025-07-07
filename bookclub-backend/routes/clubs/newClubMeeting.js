const { createNewMeeting } = require('../../db/dbClubQueries')

async function addNewMeeting(req, res) {
  const newMeeting = req.body

  try {
    const newMeetingData = await createNewMeeting(newMeeting)

    if (newMeetingData === false) {
    res.json({
      success: false, 
      body: 'Server error. Please try again.'
    })
  } else {
    res.json({
        success: true,
        body: 'Sucessfully set new meeting for the bookclub'
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

module.exports = addNewMeeting