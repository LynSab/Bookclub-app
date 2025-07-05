const express = require('express')
const allClubs = require('./allClubs')
const getClub = require('./getClub')
const addClub = require('./newClub')
const addMember = require('./newClubMember')

const clubRouter = express.Router()

clubRouter.get('/', allClubs)
clubRouter.get('/:id', getClub)
clubRouter.post('/new', addClub)
clubRouter.post('/update/members', addMember)

module.exports = clubRouter