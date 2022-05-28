const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, align } = format;


//TODO: //https://michaelscepaniak.com/2010s/fixed-length-level-logging-in-winston/
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} -- [${level}]: ${message}`;
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    format.colorize(),
    align(),
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    myFormat
  ),
  transports: [new transports.Console()]
});


module.exports = logger;