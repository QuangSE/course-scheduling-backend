const dotenv = require('dotenv').config()
const http = require('http') //TODO: setup https server

const app = require('./app')
const logger = require('./util/logger')

const server = http.createServer(app)
const port = process.env.PORT

server.listen(port, (err) => {
    if (err) logger.error(err)
    logger.info('Yey, your server is running at ' + process.env.Host + ':' + port)
})
