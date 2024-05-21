const express = require('express')
const router = express.Router()
const {
  createProcess,
  getProcessById
} = require('../controller/process.controller')

// Utility function to generate a random number

router.post('/create-process', createProcess)
router.get('/get-process/:pid', getProcessById)

module.exports = router
