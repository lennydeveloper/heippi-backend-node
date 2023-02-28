const { DataTypes } = require('sequelize')
const sequelize = require('../../utils/connection')
const User = require('./User')
const Role = require('./Role')

const Person = sequelize.define('personas', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  identificador: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

Person.belongsTo(User, {
  as: 'user',
  foreignKey: 'usuario_id',
  onDelete: 'SET NULL'
})

Person.belongsTo(Role, {
  as: 'role',
  foreignKey: 'rol_id',
  onDelete: 'SET NULL'
})

module.exports = Person
