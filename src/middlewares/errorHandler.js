const logger = require("../util/logger");
const errNames = require("../util/constants/errorNames");

//FIXME: doesn't work as a middleware yet, workaround: controllers have to include this manually
function errorHandler(err, res) {
  logger.error(err.stack);
  switch (err.name) {
    case errNames.VALIDATION_ERROR:
      res.status(400).send({
        error: err.name,
        message: err.message,
      });
      break;
    case errNames.UNIQUE_VIOLATION_ERROR:
      res.status(409).send({
        error: err.name,
        message: err.nativeError.sqlMessage,
      });
      break;
    case errNames.INVALID_PARAMETER_ERROR:
      res.status(400).send({
        error: err.name,
        message: err.message,
      });
      break;
    case errNames.INVALID_REQ_BODY_ERROR:
      res.status(400).send({
        error: err.name,
        message: err.message,
      });
      break;
    case errNames.FOREIGN_KEY_VIOLATION_ERROR:
      res.status(500).send({
        error: err.name,
        message: err.message,
      });
      break;
    case errNames.INVALID_USERNAME_ERROR:
      res.status(401).send({
        error: err.name,
        message: err.message,
      });
      break;
    case errNames.INVALID_PASSWORD_ERROR:
      res.status(401).send({
        error: err.name,
        message: err.message,
      });
      break;
      case errNames.INVALID_TOKEN_ERROR:
      res.status(err.status).send({
        error: err.name,
        message: err.message,
      });
      break;
    default:
      res.status(500).send({
        error: err.name,
        message: err.message,
      });
      break;
  }
}

module.exports = errorHandler;
