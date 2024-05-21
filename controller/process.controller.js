const Process = require('../schema/process.model')
const { createLogQueue } = require('../jobs/logQueue')
const generateRandomNumber = require('../utils/generateRandomNumber')

const createProcess = async (req, res) => {
  const pid = generateRandomNumber()
  const newProcess = new Process({ pid })

  try {
    await newProcess.save()
    await createLogQueue(newProcess._id, newProcess.creation_time)
    res.status(201).json({ process: newProcess })
  } catch (error) {
    res.status(500).json({ error, message: 'Error creating process' })
  }
}

const getProcessById = async (req, res) => {
  const pid = req.params.pid
  try {
    const process = await Process.findOne({ pid })
    res.status(200).json({ process })
  } catch (error) {
    res.status(404).json({ error, message: 'No process found with this id' })
  }
}

module.exports = { createProcess, getProcessById }
