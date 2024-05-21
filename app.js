const express = require('express')
const cron = require('node-cron')
const dotenv = require('dotenv')
const processRoute = require('./routes/process.route')
const connectDb = require('./configs/connectDb')
const scheduler = require('./jobs/cron')

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000
const cronSchedule = '*/5 * * * * *'
const job = cron.schedule(cronSchedule, scheduler)
job.start()

// connect to database
connectDb()

// middleware to parse JSON
app.use(express.json())

// routes
app.use('/', processRoute)

app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`)
})
