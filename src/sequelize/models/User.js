const { DataTypes } = require('sequelize')
const sequelize = require('../../utils/connection')

const User = sequelize.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  identificacion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: {
        msg: 'La identificación solo puede contener números'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Por favor use el formato de email apropiado: email@example.com'
      }
    }
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [10, 10],
        msg: 'El teléfono debe llevar 10 dígitos'
      }
    }
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = User
