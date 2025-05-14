const data = require('../../dummy-book-clubs')

function getClubRecord(id, bookclubs) {
  let recordByID = {}

  for (let club of bookclubs) {
    if (club.id == id) {
      recordByID = club
    }
  }

  return recordByID
}

function getClub(req, res) {
  console.log(req.params)
  res.json(getClubRecord(req.params.id, data))
}

module.exports = getClub