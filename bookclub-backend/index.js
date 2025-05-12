const express = require('express')
const userRouter = require('./routes/users/router')

const app = express()

app.use('/user', userRouter)

app.listen(8080, function() {
  console.log('Server running on 8080')
})