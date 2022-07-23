const compulsoryModuleService = require("../services/compulsoryModuleService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions"); //TODO: import the required function instead
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg= require("../util/logMessages")
const compulsoryModule = require("../util/constants/tableNames").compulsoryModule

exports.getAllCompulsoryModules = async function (req, res) {
  try {
    res.send(await compulsoryModuleService.getAllCompulsoryModules());
    logger.info(msg.fetchedAll(compulsoryModule));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getCompulsoryModuleById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await compulsoryModuleService.getCompulsoryModuleById(id);
    if (result) {
      logger.info(msg.fetched(compulsoryModule, id));
      return res.send(result);
    }
    throw new InvalidParamError(compulsoryModule, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewCompulsoryModule = async function (req, res, next) {
  try {
    await compulsoryModuleService.createNewCompulsoryModule(req.body)
    res.status(201).send("OK");
    logger.info(msg.created(compulsoryModule));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateCompulsoryModule = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await compulsoryModuleService.updateCompulsoryModule(id, req.body)))
      throw new InvalidParamError(compulsoryModule, id);
    logger.info(msg.updated(compulsoryModule, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteCompulsoryModuleById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await compulsoryModuleService.deleteCompulsoryModuleById(id)))
      throw new InvalidParamError(compulsoryModule, id);
    logger.info(msg.deleted(compulsoryModule, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};
