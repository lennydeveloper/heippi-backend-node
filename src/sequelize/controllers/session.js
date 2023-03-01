const User = require('../models/User')
const Person = require('../models/Person')
const { decryptPassword } = require('../../utils/session')
const op = require('sequelize').Op
const jwt = require('jsonwebtoken')
require('dotenv').config()

const USER_NOT_FOUND = 'Usuario no encontrado'
const CREDENTIALS_NOT_FOUND = 'Credenciales no válidas'
const LOGIN_SUCCESS = 'Inicio de sesión exitoso'

const login = async (req, res) => {
  const { email, clave } = req.body

  const user = await User.findOne({
    where: {
      email
    },
    raw: true
  })

  if (!user) return res.status(404).json({ msg: USER_NOT_FOUND })
  const decryptedPassword = decryptPassword(user.clave)

  if (decryptedPassword === clave) {
    // Establecer la lógica para relacionar rol con las tablas correspondientes + usuario_id
    const persons = await Person.findAll({
      where: {
        '$user.email$': { [op.eq]: email }
      },
      include: {
        model: User,
        as: 'user'
      },
      raw: true
    })

    const usuario = {
      rolId: persons[0].rol_id,
      identifier: persons[0].identificador,
      userId: persons[0].usuario_id
    }

    const token = jwt.sign(usuario, process.env.SECRET, { expiresIn: '30m' })
    res.cookie('token', token, {
      httpOnly: false
      // secure: true
    })
    return res.json({ msg: LOGIN_SUCCESS })
  } else {
    return res.json({ msg: CREDENTIALS_NOT_FOUND })
  }
}

module.exports = login
