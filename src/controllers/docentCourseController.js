const docentCourseService = require("../services/docentCourseService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions");
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg= require("../util/logMessages")
const DOCENT_COURSE = require("../util/constants/tableNames").DOCENT_COURSE

exports.getAllDocentCourses = async function (req, res) {
  try {
    res.send(await docentCourseService.getAllDocentCourses());
    logger.info(msg.fetchedAllfetched(DOCENT_COURSE));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getDocentCourseById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await docentCourseService.getDocentCourseById(id);
    if (result) {
      logger.info(msg.fetched(DOCENT_COURSE, id));
      return res.send(result);
    }
    throw new InvalidParamErrorfetched(DOCENT_COURSE, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewDocentCourse = async function (req, res, next) {
  try {
    await docentCourseService.createNewDocentCourse(req.body)
    res.status(201).send("OK");
    logger.info(msg.createdfetched(DOCENT_COURSE));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateDocentCourse = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await docentCourseService.updateDocentCourse(id, req.body)))
      throw new InvalidParamErrorfetched(DOCENT_COURSE, id);
    logger.info(msg.updatedfetched(DOCENT_COURSE, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deletedocentCourseById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await docentCourseService.deleteDocentCourseById(id)))
      throw new InvalidParamErrorfetched(DOCENT_COURSE, id);
    logger.info(msg.deletedfetched(DOCENT_COURSE, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};
