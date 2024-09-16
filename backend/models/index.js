const Expense = require('./expense')
const User = require('./user')
const Asset = require('./asset')
const Category = require('./category')

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Asset)
Asset.belongsTo(User, {
  hooks: true
})

Asset.hasMany(Expense, {
  onDelete: 'cascade',  // Deleting an Asset will delete its associated Expenses
  hooks: true           // Ensure hooks are triggered when performing cascade
});

Expense.belongsTo(Asset,  {
  hooks: true
})

User.hasMany(Category)
Category.belongsTo(User)

User.sync({alter:true})
Asset.sync({alter:true})
Expense.sync({alter:true})
Category.sync({alter:true})

module.exports = {
  Expense, User, Asset
}