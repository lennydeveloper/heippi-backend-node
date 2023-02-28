const Person = require('../models/Person')

const create = async (res, { userId, roleId, identifier }) => {
  const result = await Person.create({
    usuario_id: userId,
    rol_id: roleId,
    identificador: identifier
  })
    .catch((err) => {
      const errors = err.errors.map(item => {
        return {
          msg: item.message
        }
      })

      res.status(409).json(errors)
    })

  if (!res.headersSent) return res.status(201).json(result)
}

module.exports = create
