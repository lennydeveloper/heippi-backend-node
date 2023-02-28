const { DataTypes } = require('sequelize')
const sequelize = require('../../utils/connection')

const Role = sequelize.define('roles', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isIn: {
        args: ['Hospital', 'Médico', 'Paciente'],
        msg: 'Este rol no es válido'
      }
    }
  }
})

module.exports = Role
