const express = require('express')
const getUser = require('./getUser')
const login = require('./login')
const signUp = require('./signUp')

const userRouter = express.Router()

userRouter.get('/:id', getUser)
userRouter.post('/', signUp)
userRouter.post('/login', login)

module.exports = userRouter