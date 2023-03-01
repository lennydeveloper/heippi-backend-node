const express = require('express')
const router = express.Router()
// routers
const userRouter = require('./user')
const sessionRouter = require('./session')
const hospitalRouter = require('./hospital')
const observationRouter = require('./observation')

router.use('/users', userRouter)
router.use(sessionRouter)
router.use('/hospital', hospitalRouter)
router.use('/observations', observationRouter)

module.exports = router
