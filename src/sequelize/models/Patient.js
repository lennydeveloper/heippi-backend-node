const { DataTypes } = require('sequelize')
const sequelize = require('../../utils/connection')

const Patient = sequelize.define('pacientes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
})

module.exports = Patient
