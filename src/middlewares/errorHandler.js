const logger = require('../util/logger');
const errNames = require('../util/constants/errorNames');

function errorHandler(err, res) {
  logger.error(err.stack);
  switch (err.name) {
    case errNames.INVALID_USERNAME_ERROR:
      res.status(401).send({
        name: err.name,
        message: err.message,
      });
      break;
    case errNames.INVALID_PASSWORD_ERROR:
      res.status(401).send({
        name: err.name,
        message: err.message,
      });
      break;
    case errNames.VALIDATION_ERROR:
      res.status(400).send({
        name: err.name,
        message: err.message,
      });
      break;
    case errNames.UNIQUE_VIOLATION_ERROR:
      res.status(422).send({
        name: err.name,
        message: err.nativeError.sqlMessage,
      });
      break;
    case errNames.INVALID_PARAMETER_ERROR:
      res.status(400).send({
        name: err.name,
        message: err.message,
      });
      break;
    case errNames.INVALID_REQ_BODY_ERROR:
      res.status(400).send({
        name: err.name,
        message: err.message,
      });
      break;
    default:
      res.status(500).send({
        name: err.name,
        message: err.message,
      });
      break;
  }
}

module.exports = errorHandler;
