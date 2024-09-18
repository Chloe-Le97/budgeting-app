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
			const income = await Expense.create({
				...req.body,
				money: req.body.money,
				assetId: req.body.assetId,
				userId: user.id
			})
			return res.json(income)
		}catch(error){
			next(error)
		}
	}else{
		return res.status(401).json({ error: 'This asset is not belong to this user' })
	}

})

module.exports = router