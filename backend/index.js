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

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/assets', assetsRouter)
app.use('/api/expenses', expensesRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()