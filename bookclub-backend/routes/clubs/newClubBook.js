const { createNewBook } = require('../../db/dbClubQueries')

async function addNewBook(req, res) {
  const newBook = req.body

  const newBookData = await createNewBook(newBook)

  if (newBookData === false) {
    res.json({
      success: false, 
      body: 'Server error. Please try again.'
    })
  } else {
    res.json({
      success: true,
      body: 'Sucessfully set new book for the bookclub'
    })
  }
}

module.exports = addNewBook