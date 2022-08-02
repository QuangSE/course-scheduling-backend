const docentCourseService = require('../services/docentCourseService');
const logger = require('../util/logger');
const errorHandler = require('../middlewares/errorHandler');
const { checkIdParam } = require('../util/utilFunctions');
const InvalidParamError = require('../util/customErrors').InvalidParameterError;
const msg = require('../util/logMessages');
const DOCENT_COURSE = require('../util/constants/tableNames').DOCENT_COURSE;

exports.getAllDocentCourses = async function (req, res) {
    try {
        res.send(await docentCourseService.getAllDocentCourses());
        logger.info(msg.fetchedAll(DOCENT_COURSE));
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.getDocentCourseById = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id); //throws an error if id is not a number
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
        let docentCourseData = req.body;
        req.body.updated_by = req.session.user.docent_id;
        const result = await docentCourseService.createNewDocentCourse(docentCourseData);
        res.status(201).send(result);
        logger.info(msg.created(DOCENT_COURSE));
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.updateDocentCourse = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id); //throws an error if id is not a number
        if (!(await docentCourseService.updateDocentCourse(id, req.body)))
            throw new InvalidParamErrorfetched(DOCENT_COURSE, id);
        logger.info(msg.updated(DOCENT_COURSE, id));
        res.sendStatus(200);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.deletedocentCourseById = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id); //throws an error if id is not a number
        if (!(await docentCourseService.deleteDocentCourseById(id)))
            throw new InvalidParamErrorfetched(DOCENT_COURSE, id);
        logger.info(msg.deleted(DOCENT_COURSE, id));
        res.sendStatus(200);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.getDocentCourse = async function (req, res) {
    try {
        //TODO: handle req.body error
        const docentId = req.body.docent_id;
        const courseId = req.body.course_id;
        const result = await docentCourseService.getDocentCourse(docentId, courseId);

        return res.send(result);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.getDocentCourseByCourseId = async function (req, res) {
    try {
        const courseId = req.body.course_id;
        const result = await docentCourseService.getDocentCourseByCourseId(courseId);

        return res.send(result);
    } catch (err) {
        errorHandler(err, res);
    }
};
