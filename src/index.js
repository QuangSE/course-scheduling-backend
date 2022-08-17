const dotenv = require('dotenv').config();
const http = require('http'); //TODO: setup https server
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = require('./app');
const logger = require('./util/logger');

const httpServer = http.createServer(app);
const port = process.env.PORT;

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, process.env.SSL_SERVER_KEY)),
  cert: fs.readFileSync(path.join(__dirname, process.env.SSL_SERVER_CERT)),
};

const sslServer = https.createServer(sslOptions, app);

sslServer.listen(port, (err) => {
  if (err) logger.error(err);
  logger.info(
    'Yey, your server is running at ' + process.env.Host + ':' + port
  );
});

/* httpServer.listen(3002, (err) => {
  if (err) logger.error(err);
  logger.info(
    'Yey, your server is running at ' + process.env.Host + ':' + 3002
  );
}); */
