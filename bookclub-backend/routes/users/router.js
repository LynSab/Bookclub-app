const express = require('express')
const getUser = require('./getUser')
const login = require('./login')
const signUp = require('./signUp')
const cookieValidator = require('../../cookieValidator')

const userRouter = express.Router()

userRouter.get('/get', cookieValidator, getUser)
userRouter.post('/', signUp)
userRouter.post('/login', login)

module.exports = userRouter