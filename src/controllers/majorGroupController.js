const majorGroupService = require("../services/majorGroupService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions");
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg= require("../util/constants/logMessages")
const majorGroup = require("../util/constants/tableNames").majorGroup

exports.getAllMajorGroups = async function (req, res) {
  try {
    res.send(await majorGroupService.getAllMajorGroups());
    logger.info(msg.fetchedAll(majorGroup));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getMajorGroupById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await majorGroupService.getMajorGroupById(id);
    if (result) {
      logger.info(msg.fetched(majorGroup, id));
      return res.send(result);
    }
    throw new InvalidParamError(majorGroup, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewMajorGroup = async function (req, res, next) {
  try {
    await majorGroupService.createNewMajorGroup(req.body)
    res.status(201).send("OK");
    logger.info(msg.created(majorGroup));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateMajorGroup = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await majorGroupService.updateMajorGroup(id, req.body)))
      throw new InvalidParamError(majorGroup, id);
    logger.info(msg.updated(majorGroup, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteMajorGroupById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await majorGroupService.deleteMajorGroupById(id)))
      throw new InvalidParamError(majorGroup, id);
    logger.info(msg.deleted(majorGroup, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};
