const userService = require("../services/userService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions");
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg = require("../util/logMessages");
const user = require("../util/constants/tableNames").user;

exports.getAllUsers = async function (req, res) {
  try {
    res.send(await userService.getAllUsers());
    logger.info(msg.fetchedAll(user));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getUserById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await userService.getUserById(id);
    if (result) {
      logger.info(msg.fetched(user, id));
      return res.send(result);
    }
    throw new InvalidParamError(user, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getUserByUsername = async function (req, res) {
  try {
    const username = req.params.username;
    const result = await userService.getUserByUsername(username);
    if (result) {
      logger.info(msg.fetched(user, username));
    }
    return res.send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getDocentOfUser = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await userService.getDocentOfUser(id);
    if (result) {
      logger.info(msg.fetched(user, id));
      return res.send(result);
    }
    throw new InvalidParamError(user, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewUser = async function (req, res, next) {
  try {
    await userService.createNewUser(req.body);
    res.status(201).send("OK");
    logger.info(msg.created(user));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateUser = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await userService.updateUser(id, req.body)))
      throw new InvalidParamError(user, id);
    logger.info(msg.updated(user, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteUserById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await userService.deleteUserById(id)))
      throw new InvalidParamError(user, id);
    logger.info(msg.deleted(user, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};
