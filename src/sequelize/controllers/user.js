const User = require('../models/User')
const Hospital = require('../models/Hospital')
const Doctor = require('../models/Doctor')
const Patient = require('../models/Patient')
const { decryptPassword, encryptPassword } = require('../../utils/session')
const createNewPerson = require('../controllers/person')

const MESSAGES = {
  USER_NOT_FOUND: 'Usuario no encontrado',
  PASS_CHANGED: 'Clave actualizada exitosamente',
  USER_PERMISSIONS: 'El usuario no tiene permisos para agregar un nuevo médico',
  SESSION_FAILED: 'La sesión no existe, por favor ingrese nuevamente',
  MISSING_PARAMS: 'Debe agregar todos los campos requeridos'
}

// Check if all elements of arr2 are in arr1
const isSubset = (arr1, arr2) => arr2.every((el) => arr1.includes(el))

// Revisar sesión con rol para el caso del médico => solo puede ser registrado por un hospital
const create = async (req, res) => {
  const { identificacion, email, telefono, clave, rol } = req.body

  const keys = Object.keys(req.body)
  const generalParams = ['nombre', 'direccion']
  const personParams = ['fechaNacimiento']
  const hospitalParams = ['serviciosMedicos']

  const fullParams =
    rol === 1
      ? generalParams.concat(hospitalParams)
      : generalParams.concat(personParams)

  if (!isSubset(keys, fullParams)) {
    return res.json({ msg: MESSAGES.MISSING_PARAMS })
  }

  const encryptedPassword = encryptPassword(clave)
  // generate new user
  const user = await User.create({
    identificacion,
    email,
    telefono,
    clave: encryptedPassword
  }).catch((err) => {
    const errors = err.errors.map((item) => {
      return {
        msg: item.message
      }
    })
    res.status(409).json(errors)
  })

  if (!res.headersSent) {
    // generate person role-based => (Hospital, Doctor, Patient)
    switch (rol) {
      case 1: {
        const { nombre, direccion, serviciosMedicos } = req.body
        const hospital = await Hospital.create({
          nombre,
          direccion,
          servicios_medicos: serviciosMedicos
        }).catch((err) => {
          const errors = err.errors.map((item) => {
            return {
              msg: item.message
            }
          })
          res.status(409).json(errors)
        })

        if (!res.headersSent) {
          const userId = user.get().id
          const hospitalId = hospital.get().id

          createNewPerson(res, { userId, roleId: rol, identifier: hospitalId })
        }
        break
      }

      case 2: {
        const { nombre, direccion, fechaNacimiento } = req.body
        await req.sessionStore.get(req.sessionID, async (_err, data) => {
          if (data === undefined) res.send(MESSAGES.SESSION_FAILED)
          const userSession = req.session.user

          if (userSession.rolId !== 1) {
            return res.json({ msg: MESSAGES.USER_PERMISSIONS })
          } else {
            const doctor = await Doctor.create({
              nombre,
              direccion,
              fecha_nacimiento: fechaNacimiento
            }).catch((err) => {
              const errors = err.errors.map((item) => {
                return {
                  msg: item.message
                }
              })
              res.status(409).json(errors)
            })

            if (!res.headersSent) {
              const userId = user.get().id
              const doctorId = doctor.get().id

              createNewPerson(res, { userId, roleId: rol, identifier: doctorId })
            }
          }
        })
        break
      }

      case 3: {
        const { nombre, direccion, fechaNacimiento } = req.body
        const paciente = await Patient.create({
          nombre,
          direccion,
          fecha_nacimiento: fechaNacimiento
        }).catch((err) => {
          const errors = err.errors.map((item) => {
            return {
              msg: item.message
            }
          })
          res.status(409).json(errors)
        })

        if (!res.headersSent) {
          const userId = user.get().id
          const pacienteId = paciente.get().id

          createNewPerson(res, { userId, roleId: rol, identifier: pacienteId })
        }
        break
      }

      default:
        break
    }
  }
}

const getAll = async (_req, res) => {
  const users = await User.findAll()
  return res.json(users)
}

const getOne = async (req, res) => {
  const { id } = req.params
  const user = await User.findByPk(id)

  if (!user) return res.status(404).json({ msg: MESSAGES.USER_NOT_FOUND })
  return res.json(user)
}

const newPassword = async (req, res) => {
  const { email, clave } = req.body
  const encryptedPassword = encryptPassword(clave)

  await User.update(
    { clave: encryptedPassword },
    {
      where: {
        email
      }
    }
  ).then(([affectedCount, _affectedRows]) => {
    if (affectedCount === 1) {
      return res.json({ msg: MESSAGES.PASS_CHANGED })
    } else {
      return res.status(404).json({ msg: MESSAGES.USER_NOT_FOUND })
    }
  })
}

const recoverPassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({
    where: {
      email
    },
    raw: true
  })

  if (user) {
    const clave = decryptPassword(user.clave)
    return res.json({ email, clave })
  }

  return res.status(404).json({ msg: MESSAGES.USER_NOT_FOUND })
}

const remove = async (req, res) => {
  const userDeleted = await User.destroy({
    where: {
      id: req.params.id
    }
  })

  if (!userDeleted) return res.status(404).json({ msg: MESSAGES.USER_NOT_FOUND })
  return res.sendStatus(204)
}

const update = async (req, res) => {
  const { id } = req.params
  const userUpdated = await User.update(req.body, {
    where: { id },
    returning: true
  })

  if (!userUpdated[0]) return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND })
  return res.json(userUpdated[1][0])
}

module.exports = {
  create,
  getAll,
  getOne,
  newPassword,
  recoverPassword,
  remove,
  update
}
