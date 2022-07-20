const moduleMajorGroupService = require("../services/moduleMajorGroupService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions");
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg= require("../util/constants/logMessages")
const moduleMajorGroup = require("../util/constants/tableNames").moduleMajorGroup

exports.getAllModuleMajorGroups = async function (req, res) {
  try {
    res.send(await moduleMajorGroupService.getAllModuleMajorGroups());
    logger.info(msg.fetchedAll(moduleMajorGroup));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getModuleMajorGroupById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await moduleMajorGroupService.getModuleMajorGroupById(id);
    if (result) {
      logger.info(msg.fetched(moduleMajorGroup, id));
      return res.send(result);
    }
    throw new InvalidParamError(moduleMajorGroup, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewModuleMajorGroup = async function (req, res, next) {
  try {
    await moduleMajorGroupService.createNewModuleMajorGroup(req.body)
    res.status(201).send("OK");
    logger.info(msg.created(moduleMajorGroup));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateModuleMajorGroup = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await moduleMajorGroupService.updateModuleMajorGroup(id, req.body)))
      throw new InvalidParamError(moduleMajorGroup, id);
    logger.info(msg.updated(moduleMajorGroup, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteModuleMajorGroupById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await moduleMajorGroupService.deleteModuleMajorGroupById(id)))
      throw new InvalidParamError(moduleMajorGroup, id);
    logger.info(msg.deleted(moduleMajorGroup, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};
