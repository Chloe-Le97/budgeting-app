const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Op } = require('sequelize')
const {sequelize} = require('../util/db')
const R = require('ramda')

const { Asset, User, Expense } = require('../models')

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
	// const assets = await Asset.findAll({
	// 	where: {
	// 		userId: user.id
	// 	}
	//   })
	const assetSum = await Expense.findAll({
		where: {
			userId: user.id
		},
		attributes: [
		  "asset_id",
		  [sequelize.fn("sum", sequelize.col("money")), "total_money"],
		],
		group: ["asset_id"],
	  });

	  console.log(JSON.stringify(assetSum, null, 2))
	  const assetsIdArray = R.map(R.path(['dataValues','asset_id']), assetSum)
	  
	  const assets = await Asset.findAll({
		where:{
			id: assetsIdArray
		},
		attributes:[
			"name", ["id", "asset_id"]
		]
	  })
	  
	  // Create a map to combine objects by asset_id
		let combinedMap = new Map();

		// Process first array
		assetSum.forEach(item => {
			combinedMap.set(item.dataValues.asset_id, { ...item.dataValues });
		});

		// Process second array and merge dataValues
		assets.forEach(item => {
			if (combinedMap.has(item.dataValues.asset_id)) {
				// Merge existing object dataValues with new dataValues
				let existingObject = combinedMap.get(item.dataValues.asset_id);
				combinedMap.set(item.dataValues.asset_id, { ...existingObject, ...item.dataValues });
			} else {
				combinedMap.set(item.dataValues.asset_id, { ...item.dataValues });
			}
		});

	// Convert the map back to an array
	let combinedArray = Array.from(combinedMap.values());

	res.json(combinedArray)
  })

  router.post('/',tokenExtractor, async(req,res)=>{
	console.log(req.body)
	const user = await User.findByPk(req.decodedToken.id)
	const asset = await Asset.create({
		name: req.body.name,
		userId: user.id
	})

	await Expense.create({
		category: 'initial balance',
		money: req.body.value,
		assetId: asset.id,
		userId: user.id,
		isAssetUpdate: true
	})

	res.json(asset)
  })

  router.put('/:id',tokenExtractor, async(req,res)=>{
	const user = await User.findByPk(req.decodedToken.id)
	const asset = await Asset.findByPk(req.params.id)
	
	asset.name = req.body.name

	if(asset.userId === user.id){
		const updateAsset = await Expense.create({
			category: 'update balance',
			money: req.body.differentValue,
			assetId: asset.id,
			userId: user.id,
			isAssetUpdate: true
		})
		await asset.save()

		const returnedAsset = {
			asset_id: asset.id,
			name : asset.name,
			total_money:  updateAsset.money
		}
		return res.json(returnedAsset)
	}
	else{
		return res.status(403).json({ error: 'You are not authorized to edit this asset' });
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