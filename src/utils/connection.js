import * as pg from 'pg'
const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL,
  { dialectModule: pg }
)

module.exports = sequelize
