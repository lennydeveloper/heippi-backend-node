const { DataTypes } = require('sequelize')
const sequelize = require('../../utils/connection')
const Hospital = require('./Hospital')
const Doctor = require('./Doctor')
const Patient = require('./Patient')

const Observaciones = sequelize.define('observaciones', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detalle: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

Observaciones.belongsTo(Hospital, {
  as: 'hospital',
  foreignKey: 'hospital_id',
  onDelete: 'SET NULL'
})

Observaciones.belongsTo(Doctor, {
  as: 'doctor',
  foreignKey: 'medico_id',
  onDelete: 'SET NULL'
})

Observaciones.belongsTo(Patient, {
  as: 'patient',
  foreignKey: 'paciente_id',
  onDelete: 'SET NULL'
})

module.exports = Observaciones
