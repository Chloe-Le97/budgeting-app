const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')
const Category = require('./category')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passwordHash :{
	type: DataTypes.STRING,
	allowNull : false
  },
  monthlyBudget:{
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  createdAt: true,
  modelName: 'user'
})

// Define the default categories
const expenseCategories = [
  { name: 'Phone', icon: 'faPhone' },
  { name: 'Medical', icon: 'faBriefcaseMedical' },
  { name: 'Traffic', icon: 'faCar' },
  { name: 'Groceries', icon: 'faToiletPaper' },
  { name: 'Shopping', icon: 'faCartShopping' },
  { name: 'Dining', icon: 'faUtensils' },
  { name: 'Office', icon: 'faLaptopFile' },
  { name: 'Education', icon: 'faGraduationCap' },
  { name: 'Books', icon: 'faBook' },
  { name: 'Travel', icon: 'faPlaneDeparture' },
  { name: 'Fun', icon: 'faFaceSmile' },
  { name: 'Sports', icon: 'faDumbbell' },
  { name: 'Pet', icon: 'faPaw' },
  { name: 'Drinks', icon: 'faCoffee' },
  { name: 'Child', icon: 'faBaby' },
  { name: 'Unknown', icon: 'faCircleQuestion' }
];

const incomeCategories =[
  {name: 'Salary', icon:'faSackDollar'},
  {name: 'Invest', icon: 'faMoneyBillTrendUp'},
  {name: 'Rent', icon: 'faHouse'},
  {name: 'Other', icon: 'faDollarSign'}
]

// Hook to automatically create categories for the user after they are created
User.afterCreate(async (user, options) => {
  try {
    // Insert the default categories for the new user
    const createdExpensecategories = expenseCategories.map(category => ({
      name: category.name,
      icon: category.icon,
      type: 'Expenses',
      userId: user.id // Associate each category with the new user
    }));

    const createdIncomecategories = incomeCategories.map(category => ({
      name: category.name,
      icon: category.icon,
      type: 'Income',
      userId: user.id // Associate each category with the new user
    }));

    // Use bulkCreate to insert all categories at once
    await Category.bulkCreate(createdExpensecategories);
    await Category.bulkCreate(createdIncomecategories);
    console.log(`Default categories created for user ID: ${user.id}`);
  } catch (error) {
    console.error('Error inserting default categories:', error);
  }
});

module.exports = User