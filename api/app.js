const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const trendsRouter = require('./routes/trends')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
})

app.use('/api/trends', trendsRouter)

module.exports = app
