const { DataTypes } = require('sequelize')
const sequelize = require('../../utils/connection')

const Hospital = sequelize.define('hospitales', {
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
  servicios_medicos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  }
})

module.exports = Hospital
