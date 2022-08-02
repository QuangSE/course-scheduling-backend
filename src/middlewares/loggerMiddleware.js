const logger = require("../util/logger");

const loggerMiddleware = (req, res, next) => {
  logger.info(`Request:'${req.method}', URL:'${req.originalUrl}`);
  next();
};

module.exports = loggerMiddleware;