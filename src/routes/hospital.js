const { create, getAll, getOne, remove, update } = require('../sequelize/controllers/hospital')
const express = require('express')
const router = express.Router()

router.route('/')
  .get(getAll)
  .post(create)

router.route('/:id')
  .get(getOne)
  .put(update)
  .delete(remove)

module.exports = router
