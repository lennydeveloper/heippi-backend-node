const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const sessionRouter = require('./session')
const hospitalRouter = require('./hospital')

router.use('/users', userRouter)
router.use(sessionRouter)
router.use('/hospital', hospitalRouter)

module.exports = router
