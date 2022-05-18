const logger = require("../util/logger");

//TODO: add warning if protocol is http 
const loggerMiddleware = (req, res, next) => {
  logger.info(`Protocol:'${req.protocol}', Request:'${req.method}', Route:'${req.originalUrl}`); //FIXME: how to get headers?

  next();
};

module.exports = loggerMiddleware;