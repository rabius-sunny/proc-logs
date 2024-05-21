const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI)
    console.log('database connected successfully')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDb
