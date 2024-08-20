const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Asset extends Model {}

Asset.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId:{
    type: DataTypes.INTEGER,
		allowNull: false,
		references: { model: 'users', key: 'id' },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'asset'
})

module.exports = Asset