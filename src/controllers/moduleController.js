const moduleService = require("../services/moduleService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions");
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg= require("../util/logMessages")
const MODULE = require("../util/constants/tableNames").MODULE

exports.getAllModules = async function (req, res) {
  try {
    res.send(await moduleService.getAllModules());
    logger.info(msg.fetchedAll(MODULE));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getModuleById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await moduleService.getModuleById(id);
    if (result) {
      logger.info(msg.fetched(MODULE, id));
      return res.send(result);
    }
    throw new InvalidParamError(MODULE, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewModule = async function (req, res, next) {
  try {
    await moduleService.createNewModule(req.body)
    res.status(201).send("OK");
    logger.info(msg.created(MODULE));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateModule = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await moduleService.updateModule(id, req.body)))
      throw new InvalidParamError(MODULE, id);
    logger.info(msg.updated(MODULE, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteModuleById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await moduleService.deleteModuleById(id)))
      throw new InvalidParamError(MODULE, id);
    logger.info(msg.deleted(MODULE, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};
