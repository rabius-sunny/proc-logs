const express = require('express')
const dotenv = require('dotenv')
const processRoute = require('./routes/process.route')
const connectDb = require('./configs/connectDb')

dotenv.config()

const app = express()

// connect to database
connectDb()

// middleware to parse JSON
app.use(express.json())

// routes
app.use('/', processRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`)
})
