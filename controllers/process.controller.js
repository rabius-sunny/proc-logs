const formatDate = require('../libs/formatDate')
const Process = require('../schema/process.model')
const generateRandomNumber = require('../utils/generateRandomNumber')

const createProcess = async (req, res) => {
  const pid = generateRandomNumber()
  const newProcess = new Process({ pid, creation_time: Date.now() })

  try {
    await newProcess.save()
    res.status(201).json({ process: newProcess })
  } catch (error) {
    res.status(500).json({ error, message: 'Error creating process' })
  }
}

const getProcessById = async (req, res) => {
  const pid = req.params.pid
  try {
    const process = await Process.findOne({ pid }).select('logs -_id')
    const logs = process.logs.map((log) => formatDate(log))
    res.status(200).json({ logs })
  } catch (error) {
    res.status(404).json({ error, message: 'No process found with this id' })
  }
}

const getAllProcesses = async (req, res) => {
  try {
    const processes = await Process.find().select('pid creation_time -_id')
    res.status(200).json({ processes })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

const deleteProcessById = async (req, res) => {
  const pid = req.params.pid
  try {
    await Process.findOneAndDelete({ pid })
    res.status(201).json({
      ok: true,
      message: `Process: ${pid} has been deleted successfully.`
    })
  } catch (error) {
    res.status(500).json({ error, message: 'Error deleting process' })
  }
}

module.exports = {
  createProcess,
  getProcessById,
  getAllProcesses,
  deleteProcessById
}
