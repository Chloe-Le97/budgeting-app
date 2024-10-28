const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors());

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const assetsRouter = require('./controllers/assets')
const expensesRouter = require('./controllers/expenses')
const incomeRouter = require('./controllers/income')
const transferRouter = require('./controllers/transfer')
const budgetRouter = require('./controllers/budget')
const categoryRouter = require('./controllers/category')
const billRouter = require('./controllers/bill')

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/assets', assetsRouter)
app.use('/api/expenses', expensesRouter)
app.use('/api/income', incomeRouter)
app.use('/api/transfer', transferRouter)
app.use('/api/budget', budgetRouter)
app.use('/api/category', categoryRouter)
app.use('/api/bill', billRouter)

app.get('/hello',(req,res)=> res.json({data: 'Hello'}))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()