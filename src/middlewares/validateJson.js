const logger = require("../util/logger");
const errorHandler = require("./errorHandler");
const reqMethods = require("../util/constants/reqMethods");
const InvalidReqBodyError = require("../util/customErrors").InvalidReqBodyError


//TODO: test if its working
//use for POST and PUT requests only
const validateJson = (req, res, next) => {
  try {
    if (req.method === reqMethods.GET || req.method === reqMethods.DELETE) {
      return next();
    }
    logger.debug("Validating passed JSON Object");
    if (!Object.keys(req.body).length) {
      throw new InvalidReqBodyError();
    }

    next();
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = validateJson;
