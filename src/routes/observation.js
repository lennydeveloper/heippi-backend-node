const { create, getAll, remove, update } = require('../sequelize/controllers/observation')
const { authObservations } = require('../middleware/auth')
const express = require('express')
const router = express.Router()

router.route('/')
  .get(authObservations, getAll)
  .post(authObservations, create)

router.route('/:id')
  .put(update)
  .delete(remove)

module.exports = router
