const create = require('../sequelize/controllers/person')
const express = require('express')
const router = express.Router()

router.route('/login')
  .post(create)

module.exports = router
