const userService = require('./userService');
const User = require('../db/models/userModel');
const logger = require('../util/logger');

exports.verifyLogin = async function (loginDetails) {
  const user = await userService.getUserByUsername(loginDetails.username);
  if (!user) return null;

  const passwordIsValid = await user.verifyPassword(loginDetails.password);
  return passwordIsValid ? user : false;
};
