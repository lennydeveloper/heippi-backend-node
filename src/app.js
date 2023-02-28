const express = require('express')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const cors = require('cors')
require('dotenv').config()

const router = require('./routes')

const SESSION_EXPIRE_TIME = 3600000 // miliseconds

const app = express()
app.use(express.json())
app.use(cors())
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'some secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: SESSION_EXPIRE_TIME },
    store: new MemoryStore({
      checkPeriod: SESSION_EXPIRE_TIME
    })
  })
)

app.use(router)

module.exports = app
