const express = require('express')
const getUser = require('./getUser')
const login = require('./login')
const signUp = require('./signUp')
const updateUser = require('./updateUser')
const cookieValidator = require('../../cookieValidator')

const userRouter = express.Router()

userRouter.get('/get', cookieValidator, getUser)
userRouter.post('/', signUp)
userRouter.post('/login', login)
userRouter.post('/update', cookieValidator, updateUser)

module.exports = userRouter