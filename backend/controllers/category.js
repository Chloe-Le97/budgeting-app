const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Op } = require('sequelize')

const { User, Category } = require('../models')

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

router.get('/',tokenExtractor, async(req,res)=>{
    const user = await User.findByPk(req.decodedToken.id)

    const categories = await Category.findAll({
        where: {
            userId : user.id
        }
    })

    res.json(categories)
})

router.post('/',tokenExtractor, async(req,res, next)=>{
    const user = await User.findByPk(req.decodedToken.id)

    // req.body.name && req.body.icon
    const category = await Category.create({
        ...req.body,
        userId: user.id
    })
    res.json(category)
})

router.put('/:id',tokenExtractor, async(req,res, next)=>{
    const user = await User.findByPk(req.decodedToken.id)
	const category = await Category.findByPk(req.params.id)
   
    if(category.userId === user.id){
        category.name = req.body.name
        category.icon = req.body.icon
        category.type = req.body.type

        try{
            await category.save()
            res.json(category)
        } catch(error){
            next(error)
        }

    }else{
		return res.status(403).json({ error: 'You are not authorized to edit this icon' });
	} 
})

router.delete('/:id',tokenExtractor, async(req,res, next)=>{
    const user = await User.findByPk(req.decodedToken.id)
	const category = await Category.findByPk(req.params.id)
   
    if(category.userId === user.id){

        try{
            await category.destroy()
            res.status(204).end()
        } catch(error){
            next(error)
        }

    }else{
		return res.status(403).json({ error: 'You are not authorized to delete this icon' });
	} 
})

module.exports = router