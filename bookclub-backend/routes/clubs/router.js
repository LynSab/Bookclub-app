const express = require('express')
const allClubs = require('./allClubs')
const getClub = require('./getClub')
const addClub = require('./newClub')

const clubRouter = express.Router()

clubRouter.get('/', allClubs)
clubRouter.get('/:id', getClub)
clubRouter.post('/new', addClub)

module.exports = clubRouter