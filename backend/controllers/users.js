const bcrypt = require('bcrypt')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const { User, Expense, Asset } = require('../models')

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

router.get('/', async (req, res) => {
  const users = await User.findAll({
	include:{
		model : Expense,
		attributes: { exclude: ['userId'] }
	}
  })
  res.json(users)
})

router.post('/', async (req, res) => {
	const { username, name, password } = req.body

	console.log(req.body)
	
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await User.create({
		username,
		name,
		passwordHash,
	})

	// const user = User.build(req.body)
	// user.passwordHash = passwordHash
	// await user.save()
    res.json(user)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', tokenExtractor ,async(req,res) =>{
	const {username} = req.body

	console.log(username)

	const userChange = await User.findOne({where:{username : req.params.username}});
	const currentUser = await User.findByPk(req.decodedToken.id)

	if(userChange.id === currentUser.id){
		currentUser.username = username
		const user = await currentUser.save()
		res.json(user)
	}else{
		return res.status(403).json({ error: 'You are not authorized to change this username' });
	}
})

module.exports = router