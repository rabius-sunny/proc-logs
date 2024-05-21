const express = require('express')
const router = express.Router()
const {
  createProcess,
  getProcessById,
  getAllProcesses,
  deleteProcessById
} = require('../controller/process.controller')

// Utility function to generate a random number

router.post('/create-process', createProcess)
router.get('/get-all-processes', getAllProcesses)
router.get('/get-process/:pid', getProcessById)
router.delete('/delete-process/:pid', deleteProcessById)

module.exports = router
