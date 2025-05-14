const express = require('express')
const allClubs = require('./allClubs')
const getClub = require('./getClub')

const clubRouter = express.Router()

clubRouter.get('/', allClubs)
clubRouter.get('/:id', getClub)

module.exports = clubRouter