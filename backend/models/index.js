const Expense = require('./expense')
const User = require('./user')
const Asset = require('./asset')

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Asset)
Asset.belongsTo(User)

User.sync({alter:true})
Asset.sync({alter:true})
Expense.sync({alter:true})


module.exports = {
  Expense, User, Asset
}