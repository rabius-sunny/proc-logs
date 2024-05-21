const Queue = require('bull')
const processRoute = require('../routes/process.route')

const logQueues = {}

const createLogQueue = (processId, creationTime) => {
  if (logQueues[processId]) return

  const logQueue = new Queue(`logQueue-${processId}`, {
    redis: {
      url: process.env.REDIS_URL,
      port: 6379
    }
  })

  logQueue.process(async (_job) => {
    console.log('under process')
    try {
      const currentTime = new Date().toISOString()
      await processRoute.findByIdAndUpdate(processId, {
        $push: { logs: currentTime }
      })
      console.log(`updating process log for ${processId} from ${currentTime}`)
    } catch (error) {
      console.error('Error updating logs:', error)
    }
  })

  const initialDelay = new Date(creationTime).getTime() - Date.now()
  logQueue.add(
    {},
    {
      repeat: {
        every: 5000 /* for 5 seconds interval */,
        immediately: initialDelay <= 0
      },
      delay: Math.max(0, initialDelay)
    }
  )

  logQueues[processId] = logQueue
}

module.exports = { createLogQueue }
