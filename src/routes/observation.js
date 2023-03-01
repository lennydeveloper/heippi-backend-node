const { create, getAll, remove, update } = require('../sequelize/controllers/observation')
const express = require('express')
const router = express.Router()

router.route('/')
  .get(getAll)
  .post(create)

router.route('/:id')
  .put(update)
  .delete(remove)

module.exports = router
