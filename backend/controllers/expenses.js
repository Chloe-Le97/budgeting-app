const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Op } = require('sequelize')

const { Expense, Asset, User } = require('../models')

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

router.get('/', tokenExtractor ,async (req, res, next) => {
	const user = await User.findByPk(req.decodedToken.id)
	try{
		const expenses = await Expense.findAll({
			where: {
				userId: user.id
			}
		})
		res.json(expenses.filter(item => item.isAssetUpdate == false))
	}catch(error){
		next(error)
	}
})

router.post('/',tokenExtractor, async(req,res, next)=>{
	const user = await User.findByPk(req.decodedToken.id)

	const asset = await Asset.findOne({
		where: {
			id: req.body.assetId,
			userId : user.id
		}
	})

	if(asset){
		try{
			const expense = await Expense.create({
				...req.body,
				money: 0 - req.body.money,
				assetId: req.body.assetId,
				userId: user.id
			})
			res.json(expense)
		}catch(error){
			next(error)
		}

	}else{
		return res.status(401).json({ error: 'This asset is not belong to this user' })
	}

})

router.put('/:id',tokenExtractor, async(req,res, next)=>{
	const user = await User.findByPk(req.decodedToken.id)
	const expense = await Expense.findByPk(req.params.id)

	if(expense.userId === user.id){
		expense.money = req.body.money
		expense.text = req.body.text
		expense.category = req.body.category
		expense.assetId = req.body.assetId
		expense.categoryId = req.body.categoryId
		
		try{
			await expense.save()
			res.json(expense)
		}catch(error){
			next(error)
		}
	}
	else{
		return res.status(403).json({ error: 'You are not authorized to edit this expense' });
	} 
})

router.delete('/:id', tokenExtractor, async(req,res, next) =>{
	const user = await User.findByPk(req.decodedToken.id)
	const expense = await Expense.findByPk(req.params.id)

	if(expense.userId === user.id){
		try{
			await expense.destroy()

			res.status(204).end()
		}catch(error){
			next(error)
		}
	} else {
		return res.status(403).json({error:'You are not authorized to delete this expense'})
	}
})

module.exports = router