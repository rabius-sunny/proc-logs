const Process = require('../schema/process.model')
const scheduler = async () => {
  try {
    const processes = await Process.find()
    const processesToUpdate = processes.filter(
      (process) => process.logs.length < 5
    )

    for (const process of processesToUpdate) {
      if (process.logs.length === 0) {
        process.logs.push(
          new Date(new Date(process.creation_time).getTime() + 5000)
        )
      } else {
        const lastLog = process.logs.at(-1)
        process.logs.push(new Date(new Date(lastLog).getTime() + 5000))
      }
      await process.save()
    }
  } catch (error) {
    console.error('error on updating logs', error)
  }
}

module.exports = scheduler
