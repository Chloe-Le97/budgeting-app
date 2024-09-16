const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  icon: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isIn: {
        args: [['faPhone','faSuitcaseMedical','faCar','faToiletPaper','faCartShopping','faUtensils','faLaptopFile','faGraduationCap','faBook','faPlaneDeparture','faFaceSmile','faDumbbell','faCoffee','faPaw','faBaby','faCircleQuestion']], 
        msg: 'Invalid icon name.'
      }
    }, 
    defaultValue: 'faPhone'
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
  modelName: 'category'
})

module.exports = Category