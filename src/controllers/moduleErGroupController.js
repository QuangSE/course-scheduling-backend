const moduleErGroupService = require("../services/moduleErGroupService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions");
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg= require("../util/logMessages")
const moduleErGroup = require("../util/constants/tableNames").moduleErGroup

exports.getAllModuleErGroups = async function (req, res) {
  try {
    res.send(await moduleErGroupService.getAllModuleErGroups());
    logger.info(msg.fetchedAll(moduleErGroup));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getModuleErGroupById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await moduleErGroupService.getModuleErGroupById(id);
    if (result) {
      logger.info(msg.fetched(moduleErGroup, id));
      return res.send(result);
    }
    throw new InvalidParamError(moduleErGroup, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewModuleErGroup = async function (req, res, next) {
  try {
    await moduleErGroupService.createNewModuleErGroup(req.body)
    res.status(201).send("OK");
    logger.info(msg.created(moduleErGroup));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateModuleErGroup = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await moduleErGroupService.updateModuleErGroup(id, req.body)))
      throw new InvalidParamError(moduleErGroup, id);
    logger.info(msg.updated(moduleErGroup, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteModuleErGroupById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await moduleErGroupService.deleteModuleErGroupById(id)))
      throw new InvalidParamError(moduleErGroup, id);
    logger.info(msg.deleted(moduleErGroup, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};
