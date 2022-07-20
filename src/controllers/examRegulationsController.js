const examRegulationsService = require("../services/examRegulationsService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions");
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg= require("../util/constants/logMessages")
const examRegulations = require("../util/constants/tableNames").examRegulations

exports.getAllExamRegulations = async function (req, res) {
  try {
    res.send(await examRegulationsService.getAllExamRegulations());
    logger.info(msg.fetchedAll(examRegulations));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getExamRegulationsById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await examRegulationsService.getExamRegulationsById(id);
    if (result) {
      logger.info(msg.fetched(examRegulations, id));
      return res.send(result);
    }
    throw new InvalidParamError(examRegulations, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewExamRegulations = async function (req, res, next) {
  try {
    await examRegulationsService.createNewExamRegulations(req.body)
    res.status(201).send("OK");
    logger.info(msg.created(examRegulations));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateExamRegulations = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await examRegulationsService.updateExamRegulations(id, req.body)))
      throw new InvalidParamError(examRegulations, id);
    logger.info(msg.updated(examRegulations, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteExamRegulationsById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await examRegulationsService.deleteExamRegulationsById(id)))
      throw new InvalidParamError(examRegulations, id);
    logger.info(msg.deleted(examRegulations, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};
