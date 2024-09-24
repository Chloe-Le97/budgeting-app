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
    const value = req.body.value

    const user = await User.findByPk(req.decodedToken.id)


	const assetTransferFrom = await Asset.findOne({
		where: {
			id: req.body.transferFromAsset,
			userId : user.id
		}
	})

    const assetTransferTo = await Asset.findOne({
		where: {
			id: req.body.transferToAsset,
			userId : user.id
		}
	})

    if(assetTransferFrom && assetTransferTo){
		try{
			const transfer = await Expense.create({
				category: 'Transfer',
				text : 'Transfer money',
				money: 0 - value,
				assetId: assetTransferFrom.id,
				userId: user.id,
			})
			await Expense.create({
				category: 'Transfer',
				money: value,
				assetId: assetTransferTo.id,
				userId: user.id,
				text : 'Receive money',
				transactionId : transfer.transactionId
			})
	
			res.status(200).json({ message: "Success!" });
		}catch(error){
			next(error)
		}      
    }else{
        return res.status(401).json({ error: 'This asset is not belong to this user' })
    }
})

module.exports = router