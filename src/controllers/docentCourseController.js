const docentCourseService = require("../services/docentCourseService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions");
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg= require("../util/logMessages")
const docentCourse = require("../util/constants/tableNames").docentCourse

exports.getAllDocentCourses = async function (req, res) {
  try {
    res.send(await docentCourseService.getAllDocentCourses());
    logger.info(msg.fetchedAll(docentCourse));
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
      logger.info(msg.fetched(docentCourse, id));
      return res.send(result);
    }
    throw new InvalidParamError(docentCourse, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewDocentCourse = async function (req, res, next) {
  try {
    await docentCourseService.createNewDocentCourse(req.body)
    res.status(201).send("OK");
    logger.info(msg.created(docentCourse));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateDocentCourse = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await docentCourseService.updateDocentCourse(id, req.body)))
      throw new InvalidParamError(docentCourse, id);
    logger.info(msg.updated(docentCourse, id));
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
      throw new InvalidParamError(docentCourse, id);
    logger.info(msg.deleted(docentCourse, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};
