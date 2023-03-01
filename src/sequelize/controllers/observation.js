const Observation = require('../models/Observation')

const MESSAGES = {
  USER_NOT_FOUND: 'Usuario no encontrado',
  USER_PERMISSIONS: 'El usuario no tiene permisos para registrar una nueva observación',
  SESSION_FAILED: 'La sesión no existe, por favor ingrese nuevamente',
  MISSING_PARAMS: 'Debe agregar todos los campos requeridos'
}

// Revisar sesión con rol => las observaciones solo pueden ser registradas por un usuario médico
const create = async (req, res) => {
  const { hospitalId, medicoId, pacienteId, especialidad, detalle } = req.body

  await req.sessionStore.get(req.sessionID, async (_err, data) => {
    if (data === undefined) {
      return res.json({ msg: MESSAGES.SESSION_FAILED })
    } else {
      const userSession = req.session.user
      if (userSession.rolId === 2) {
        const observation = await Observation.create({
          hospital_id: hospitalId,
          medico_id: medicoId,
          paciente_id: pacienteId,
          especialidad,
          detalle
        }).catch((err) => {
          const errors = err.errors.map((item) => {
            return {
              msg: item.message
            }
          })
          res.status(409).json(errors)
        })
        if (!res.headersSent) return res.status(201).json(observation)
      } else {
        return res.json({ msg: MESSAGES.USER_PERMISSIONS })
      }
    }
  })
}

const getAll = async (req, res) => {
  await req.sessionStore.get(req.sessionID, async (_err, data) => {
    if (data === undefined) return res.json({ msg: MESSAGES.SESSION_FAILED })
    else {
      const userSession = req.session.user

      switch (userSession.rolId) {
        case 1: {
          const observations = Observation.findAll({
            where: { hospital_id: userSession.identifier }
          })
          res.json(observations)
          break
        }
        case 2: {
          const observations = Observation.findAll({
            where: { medico_id: userSession.identifier }
          })
          res.json(observations)
          break
        }
        case 3: {
          const observations = Observation.findAll({
            where: { paciente_id: userSession.identifier }
          })
          res.json(observations)
          break
        }
        default: { break }
      }
    }
  })
}

const remove = async (req, res) => {
  const observationDeleted = await Observation.destroy({
    where: {
      id: req.params.id
    }
  })

  if (!observationDeleted) return res.status(404).json({ msg: MESSAGES.USER_NOT_FOUND })
  return res.sendStatus(204)
}

const update = async (req, res) => {
  const { id } = req.params
  const observationUpdated = await Observation.update(req.body, {
    where: { id },
    returning: true
  })

  if (!observationUpdated[0]) return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND })
  return res.json(observationUpdated[1][0])
}

module.exports = {
  create,
  getAll,
  remove,
  update
}
