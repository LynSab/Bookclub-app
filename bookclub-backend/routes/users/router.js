const express = require('express')
const getUser = require('./getUser')

const userRouter = express.Router()

userRouter.get('/:id', getUser)

module.exports = userRouter