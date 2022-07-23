const logger = require("../util/logger");
const errNames = require("../util/constants/errorNames");

//FIXME: doesn't work as a middleware yet, workaround: controllers have to include this manually
function errorHandler(err, res) {
  logger.error(err.stack);
  switch (err.name) {
    case errNames.ValidationError:
      res.status(400).send({
        error: err.name,
        message: err.message,
      });
      break;
    case errNames.UniqueViolationError:
      res.status(409).send({
        error: err.name,
        message: err.nativeError.sqlMessage,
      });
      break;
    case errNames.InvalidParameterError:
      res.status(400).send({
        error: err.name,
        message: err.message,
      });
      break;
    case errNames.InvalidReqBodyError:
      res.status(400).send({
        error: err.name,
        message: err.message,
      });
      break;
    case errNames.ForeignKeyViolationError:
      res.status(500).send({
        error: err.name,
        message: err.message,
      });
      break;
    case errNames.InvalidUsernameError:
      res.status(401).send({
        error: err.name,
        message: err.message,
      });
      break;
    case errNames.WrongPasswordError:
      res.status(401).send({
        error: err.name,
        message: err.message,
      });
      break;
      case errNames.InvalidTokenError:
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
