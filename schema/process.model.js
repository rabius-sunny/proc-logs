const mongoose = require('mongoose')
const Schema = mongoose.Schema

const processSchema = new Schema({
  pid: {
    type: Number,
    required: true,
    unique: true
  },
  creation_time: {
    type: Date,
    required: true
  },
  logs: {
    type: [String],
    default: []
  }
})

const Process = mongoose.model('process', processSchema)
module.exports = Process
