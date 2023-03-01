import * as pg from 'pg'
const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL,
  {
    dialectModule: pg,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
)

module.exports = sequelize
