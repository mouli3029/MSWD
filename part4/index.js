const app = require('./app')
const http = require('http')
const config = require('./utils/config').default
const logger = require('./utils/logger')

const server = http.createServer(app)
//require('dotenv').config()
server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})
