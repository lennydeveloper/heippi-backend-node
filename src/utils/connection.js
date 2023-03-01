import * as pg from 'pg'
const { Sequelize } = require('./node_modules/bin/sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL,
  { dialectModule: pg })

module.exports = sequelize
