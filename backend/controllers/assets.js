const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Op } = require('sequelize')

const { Asset, User } = require('../models')

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
	const assets = await Asset.findAll({
		where: {
			userId: user.id
		}
	  })
	  console.log(JSON.stringify(assets, null, 2))
	  res.json(assets)
  })

  router.post('/',tokenExtractor, async(req,res)=>{
	console.log(req.body)
	const user = await User.findByPk(req.decodedToken.id)
	const asset = await Asset.create({...req.body,userId: user.id})
	res.json(asset)
  })

  router.put('/:id',tokenExtractor, async(req,res)=>{
	console.log(req.body)
	const user = await User.findByPk(req.decodedToken.id)
	const asset = await Asset.findByPk(req.params.id)
	if(asset.userId === user.id){
		asset.value = req.body.value
		asset.name = req.body.name
		await asset.save()
		res.json(asset)
	}
	else{
		return res.status(403).json({ error: 'You are not authorized to delete this blog post' });
	} 
  })

  router.delete('/:id', tokenExtractor, async(req,res) =>{
	const user = await User.findByPk(req.decodedToken.id)
	const asset = await Asset.findByPk(req.params.id)
	if(asset.userId === user.id){
		await asset.destroy()
		res.status(204).end()
	} else {
		return res.status(403).json({error:'You are not authorized to delete this asset'})
	}
  })

module.exports = router