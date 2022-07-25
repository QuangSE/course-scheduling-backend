const courseService = require("../services/courseService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions");
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg= require("../util/logMessages")
const COURSE = require("../util/constants/tableNames").COURSE

exports.getAllCourses = async function (req, res) {
  try {
    res.send(await courseService.getAllCourses());
    logger.info(msg.fetchedAll(COURSE));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getCourseById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await courseService.getCourseById(id);
    if (result) {
      logger.info(msg.fetched(COURSE, id));
      return res.send(result);
    }
    throw new InvalidParamError(COURSE, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewCourse = async function (req, res, next) {
  try {
    const result = await courseService.createNewCourse(req.body)
    res.status(201).send(result);
    logger.info(msg.created(COURSE));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateCourse = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await courseService.updateCourse(id, req.body)))
      throw new InvalidParamError(COURSE, id);
    logger.info(msg.updated(COURSE, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteCourseById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await courseService.deleteCourseById(id)))
      throw new InvalidParamError(COURSE, id);
    logger.info(msg.deleted(COURSE, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};
