const express = require('express')
const allClubs = require('./allClubs')
const getClub = require('./getClub')
const addClub = require('./newClub')
const addMember = require('./newClubMember')
const addBook = require('./newClubBook')
const addMeeting = require('./newClubMeeting')

const clubRouter = express.Router()

clubRouter.get('/', allClubs)
clubRouter.get('/:id', getClub)
clubRouter.post('/new', addClub)
clubRouter.post('/update/members', addMember)
clubRouter.post('/update/book', addBook)
clubRouter.post('/update/meeting', addMeeting)

module.exports = clubRouter