const userService = require('./userService');
const User = require('../db/models/userModel');
const logger = require('../util/logger');

exports.verifyLogin = async function (loginDetails) {
  logger.debug(JSON.stringify(loginDetails));
  const user = await userService.getUserByUsername(loginDetails.username);

  if (!user) return null;

  const passwordValid = await user.verifyPassword(loginDetails.password);

  return passwordValid ? user : passwordValid;
};
