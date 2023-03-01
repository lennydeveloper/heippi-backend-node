const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const router = require('./routes')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use(router)

module.exports = app
