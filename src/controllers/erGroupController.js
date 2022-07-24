const erGroupService = require("../services/erGroupService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions");
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg= require("../util/logMessages")
const ER_GROUP = require("../util/constants/tableNames").ER_GROUP

exports.getAllErGroups = async function (req, res) {
  try {
    res.send(await erGroupService.getAllerGroups());
    logger.info(msg.fetchedAll(ER_GROUP));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getErGroupById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await erGroupService.getErGroupById(id);
    if (result) {
      logger.info(msg.fetched(ER_GROUP, id));
      return res.send(result);
    }
    throw new InvalidParamError(ER_GROUP, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewErGroup = async function (req, res, next) {
  try {
    await erGroupService.createNewErGroup(req.body)
    res.status(201).send("OK");
    logger.info(msg.created(ER_GROUP));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateErGroup = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await erGroupService.updateErGroup(id, req.body)))
      throw new InvalidParamError(ER_GROUP, id);
    logger.info(msg.updated(ER_GROUP, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteErGroupById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await erGroupService.deleteErGroupById(id)))
      throw new InvalidParamError(ER_GROUP, id);
    logger.info(msg.deleted(ER_GROUP, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};
