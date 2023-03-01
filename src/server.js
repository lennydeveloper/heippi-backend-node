const app = require('./app')
const sequelize = require('./utils/connection')
require('dotenv').config()

// sequelize models
const Role = require('./sequelize/models/Role')

const PORT = process.env.PORT || 3000
const roleData = [
  { nombre: 'Hospital' },
  { nombre: 'Médico' },
  { nombre: 'Paciente' }
]

const main = async () => {
  try {
    await sequelize.sync({ force: true }) // force just for training purposes => prod = { alter: true }
    console.log('Database connection established')
    await Role.bulkCreate(roleData)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.error(error)
  }
}

main()
