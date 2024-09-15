const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Op } = require('sequelize')

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


router.get('/', tokenExtractor ,async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id)
	
	res.json({
		userId : user.id,
		monthlyBudget : user.monthlyBudget
	})
})

router.post('/',tokenExtractor, async(req,res)=>{
	const user = await User.findByPk(req.decodedToken.id)

	if(user){
		user.monthlyBudget = req.body.budget

		await user.save()

		res.json({
			user : user.id,
			monthlyBudget : user.monthlyBudget
		})
	}else{
		return res.status(403).json({ error: 'You are not authorized to add this budget' });
	} 

})

router.put('/',tokenExtractor, async(req,res)=>{
	const user = await User.findByPk(req.decodedToken.id)

	if(user){
		user.monthlyBudget = req.body.budget
	
		await user.save()

		res.json({
			user : user.id,
			monthlyBudget : user.monthlyBudget
		})
	}
	else{
		return res.status(403).json({ error: 'You are not authorized to edit this budget' });
	} 
})


module.exports = router