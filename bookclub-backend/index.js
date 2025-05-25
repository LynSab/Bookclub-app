const express = require('express')
const userRouter = require('./routes/users/router')
const clubRouter = require('./routes/clubs/router')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: 'http://localhost:5173',
  optionSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/user', userRouter)
app.use('/club', clubRouter)

app.listen(8080, function() {
  console.log('Server running on 8080')
})