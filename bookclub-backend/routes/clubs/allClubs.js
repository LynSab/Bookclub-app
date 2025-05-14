const data = require('../../dummy-book-clubs')

function allClubs(req, res){
  const clubNames = data.map(function(bookclub){
    return {name: bookclub.name, id: bookclub.id }
  })
  console.log('Club endpoint')
  res.json(clubNames)
}

module.exports = allClubs