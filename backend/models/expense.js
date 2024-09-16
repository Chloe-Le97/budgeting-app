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
  categoryId:{
    type: DataTypes.INTEGER,
    // allowNull: false,
    references: { model: 'categories', key: 'id' },
  },
  isAssetUpdate:{
    type: DataTypes.BOOLEAN,
    defaultValue: 'false',
    allowNull: false,
  },
  updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal("(now() at time zone 'utc')") },
  createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal("(now() at time zone 'utc')") },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'expense'
})

module.exports = Expense