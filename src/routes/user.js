const { create, getAll, getOne, recoverPassword, remove, update, newPassword } = require('../sequelize/controllers/user')
const { authUsers } = require('../middleware/auth')
const express = require('express')
const router = express.Router()

router.route('/')
  .get(getAll)
  .post(authUsers, create)

router.route('/:id')
  .get(getOne)
  .put(update)
  .delete(remove)

router.route('/recover-password')
  .post(recoverPassword)

router.route('/set-password')
  .post(newPassword)

module.exports = router
