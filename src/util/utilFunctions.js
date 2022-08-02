const logger = require('./logger');
const InvalidParamError = require('./customErrors').InvalidParameterError;

//check if id contains numbers only
exports.checkIdParam = (id) => {
  if (!/^\d+$/.test(id.trim())) {
    //TODO: could also trim at the controllers
    throw new InvalidParamError('id', id);
  }
};
