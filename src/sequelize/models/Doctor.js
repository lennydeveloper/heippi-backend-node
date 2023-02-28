const { DataTypes } = require('sequelize')
const sequelize = require('../../utils/connection')
const Hospital = require('./Hospital')

const Doctor = sequelize.define('medicos', {
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

Doctor.belongsTo(Hospital, {
  as: 'hospital',
  foreignKey: 'hospital_id',
  onDelete: 'SET NULL'
})

module.exports = Doctor
