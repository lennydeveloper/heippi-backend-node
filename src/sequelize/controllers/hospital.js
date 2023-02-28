const Hospital = require('../models/Hospital')

const RECORD_NOT_FOUND = 'Hospital no encontrado'

const create = async (req, res) => {
  const { nombre, direccion, serviciosMedicos } = req.body
  const hospital = await Hospital.create({
    nombre,
    direccion,
    servicios_medicos: serviciosMedicos
  })
    .catch((err) => {
      const errors = err.errors.map(item => {
        return {
          msg: item.message
        }
      })

      res.status(409).json(errors)
    })

  if (!res.headersSent) return res.status(201).json({ hospital })
}

const getAll = async (_req, res) => {
  const result = await Hospital.findAll()
  return res.json(result)
}

const getOne = async (req, res) => {
  const { id } = req.params
  const hospital = await Hospital.findByPk(id)

  if (!hospital) return res.status(404).json({ msg: RECORD_NOT_FOUND })
  return res.json(hospital)
}

const remove = async (req, res) => {
  const hospitalDeleted = await Hospital.destroy({
    where: {
      id: req.params.id
    }
  })

  if (!hospitalDeleted) return res.status(404).json({ msg: RECORD_NOT_FOUND })
  return res.sendStatus(204)
}

const update = async (req, res) => {
  const { id } = req.params
  const hospitalUpdated = await Hospital.update(req.body, {
    where: { id },
    returning: true
  })

  if (!hospitalUpdated[0]) return res.status(404).json({ message: RECORD_NOT_FOUND })
  return res.json(hospitalUpdated[1][0])
}

module.exports = {
  create,
  getAll,
  getOne,
  remove,
  update
}
