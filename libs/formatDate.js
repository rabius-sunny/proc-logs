const dayjs = require('dayjs')
const formatDate = (dateObj) => dayjs(dateObj).format('hh:mm a DD.MM.YYYY')

module.exports = formatDate
