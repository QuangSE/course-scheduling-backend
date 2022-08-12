const logger = require('../util/logger');

const loggerMiddleware = (req, res, next) => {
  logger.info(
    `Request:'${req.method}', URL:'${req.originalUrl}, path:'${req.path}'`
  );
  next();
};

module.exports = loggerMiddleware;
