const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Expense extends Model {}

Expense.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  money: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text:{
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId:{
    type: DataTypes.INTEGER,
		allowNull: false,
		references: { model: 'users', key: 'id' },
  },
  assetId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: { model: 'assets', key: 'id' },
	},
  isAssetUpdate:{
    type: DataTypes.BOOLEAN,
    defaultValue: 'false',
    allowNull: false,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'expense'
})

module.exports = Expense