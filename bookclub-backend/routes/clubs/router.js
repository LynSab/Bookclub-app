const express = require('express')
const allClubs = require('./allClubs')

const clubRouter = express.Router()

clubRouter.get('/', allClubs)

module.exports = clubRouter