const majorService = require("../services/majorService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions");
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg= require("../util/logMessages")
const MAJOR = require("../util/constants/tableNames").MAJOR

exports.getAllMajors = async function (req, res) {
  try {
    res.send(await majorService.getAllMajors());
    logger.info(msg.fetchedAll(MAJOR));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getMajorById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await majorService.getMajorById(id);
    if (result) {
      logger.info(msg.fetched(MAJOR, id));
      return res.send(result);
    }
    throw new InvalidParamError(MAJOR, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewMajor = async function (req, res, next) {
  try {
    const result = await majorService.createNewMajor(req.body)
    res.status(201).send(result);
    logger.info(msg.created(MAJOR));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateMajor = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await majorService.updateMajor(id, req.body)))
      throw new InvalidParamError(MAJOR, id);
    logger.info(msg.updated(MAJOR, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteMajorById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await majorService.deleteMajorById(id)))
      throw new InvalidParamError(MAJOR, id);
    logger.info(msg.deleted(MAJOR, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};
