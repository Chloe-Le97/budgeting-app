const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const R = require('ramda')

const { Expense, User } = require('../models')

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
	  try {
		req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
	  } catch{
		return res.status(401).json({ error: 'token invalid' })
	  }
	}  else {
	  return res.status(401).json({ error: 'token missing' })
	}
	next()
  }

//   router.get('/', tokenExtractor ,async (req, res, next) => {
// 	const user = await User.findByPk(req.decodedToken.id)
// 	try{
// 		const expensesAll = await Expense.findAll({
// 			where: {
// 				userId: user.id
// 			}
// 		})
// 		const expenses = expensesAll.filter(item => item.isAssetUpdate == false)

//         res.json(expenses);
// 	}catch(error){
// 		next(error)
// 	}
// })

router.get('/', tokenExtractor ,async (req, res, next) => {
	const user = await User.findByPk(req.decodedToken.id)

	const reduceFunc = (arr) => {
		return arr.reduce((sumTotal, currentYearItem) =>{
			const {money} = currentYearItem;
			if(money > 0){
				return {...sumTotal, income: sumTotal.income + money }
			}
			return {...sumTotal, expense: sumTotal.expense + Math.abs(money)}
		},{expense:0, income: 0} 
		)
	}

	try{
		const expensesAll = await Expense.findAll({
			where: {
				userId: user.id
			}
		})
		const expenses = expensesAll.filter(item => item.isAssetUpdate == false)

		const groupByYear = Object.groupBy(expenses,({createdAt}) => new Date(createdAt).getFullYear())
	  
		const billItems = R.keys(groupByYear).reduce((yearObject,year) => {

			const yearItems = groupByYear[year]
		
			const groupByMonth = Object.groupBy(yearItems,({createdAt}) => new Date(createdAt).getMonth() + 1)
		
			const groupExpenseByMonth = R.keys(groupByMonth).map(key => {
				const monthItems = groupByMonth[key]
				const sumMonth = reduceFunc(monthItems)
				return {[key]: sumMonth}
			})
		
			const groupExpenseByYear = reduceFunc(yearItems)
		
			const object = {
				'monthly':groupExpenseByMonth,
				'yearly': groupExpenseByYear
			}
			return {...yearObject, [year]:object}
		},{})

		 res.json(billItems)
      
	}catch(error){
		next(error)
	}
})

module.exports = router