const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')

router.post('/', async (request, response, next) => {
  const body = request.body
  const { username, password } = request.body

  try{
    const user = await User.findOne({
      where: {
        username: username
      }
    })
    let passwordCorrect;
  if (user === null) {
    passwordCorrect = false;
  } else {
    passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  }

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
  }catch(error){
    next(error)
  }
  
})

module.exports = router