const jwt = require('jsonwebtoken')
require('dotenv').config()

const SESSION_FAILED = 'La sesión no existe, por favor ingrese nuevamente'

const validateToken = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ msg: SESSION_FAILED })
  }
}

const registerUser = (req) => {
  const token = req.cookies.token
  const user = jwt.verify(token, process.env.SECRET)
  req.user = user
}

const authUsers = (req, res, next) => {
  if (req.body.rol !== 2) {
    next()
  } else {
    validateToken(req, res)
    try {
      registerUser(req)
      next()
    } catch (error) {
      res.clearCookie('token')
      return res.json({ msg: error })
    }
  }
}

const authObservations = (req, res, next) => {
  validateToken(req, res)
  registerUser(req)
  if (!res.headersSent) next()
}

module.exports = {
  authObservations,
  authUsers
}
