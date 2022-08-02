const examRegulationsService = require('../services/examRegulationsService');
const logger = require('../util/logger');
const errorHandler = require('../middlewares/errorHandler');
const { checkIdParam } = require('../util/utilFunctions');
const InvalidParamError = require('../util/customErrors').InvalidParameterError;
const msg = require('../util/logMessages');
const EXAM_REGULATIONS = require('../util/constants/tableNames').EXAM_REGULATIONS;

exports.getAllExamRegulations = async function (req, res) {
    try {
        res.send(await examRegulationsService.getAllExamRegulations());
        logger.info(msg.fetchedAll(EXAM_REGULATIONS));
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.getExamRegulationsById = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id); //throws an error if id is not a number
        const result = await examRegulationsService.getExamRegulationsById(id);
        if (result) {
            logger.info(msg.fetched(EXAM_REGULATIONS, id));
            return res.send(result);
        }
        throw new InvalidParamError(EXAM_REGULATIONS, id);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.createNewExamRegulations = async function (req, res, next) {
    try {
        const result = await examRegulationsService.createNewExamRegulations(req.body);
        res.status(201).send(result);
        logger.info(msg.created(EXAM_REGULATIONS));
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.updateExamRegulations = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id); //throws an error if id is not a number
        if (!(await examRegulationsService.updateExamRegulations(id, req.body)))
            throw new InvalidParamError(EXAM_REGULATIONS, id);
        logger.info(msg.updated(EXAM_REGULATIONS, id));
        res.sendStatus(200);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.deleteExamRegulationsById = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id); //throws an error if id is not a number
        if (!(await examRegulationsService.deleteExamRegulationsById(id)))
            throw new InvalidParamError(EXAM_REGULATIONS, id);
        logger.info(msg.deleted(EXAM_REGULATIONS, id));
        res.sendStatus(200);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.getMajor = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id);
        const result = await examRegulationsService.getMajor(id);
        if (result) {
            logger.info(msg.fetched(EXAM_REGULATIONS, id));
            return res.send(result);
        }
        throw new InvalidParamError(EXAM_REGULATIONS, id);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.getNumberOfSemesters = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id);
        const result = await examRegulationsService.getNumberOfSemesters(id);
        if (result) {
            logger.info(msg.fetched(EXAM_REGULATIONS, id));
            return res.send(result);
        }
        throw new InvalidParamError(EXAM_REGULATIONS, id);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.getCourses = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id);
        const result = await examRegulationsService.getCourses(id);
        if (result) {
            logger.info('Courses for exam regulation with ID ' + id + ' fetched');
            return res.send(result);
        }
        throw new InvalidParamError(EXAM_REGULATIONS, id);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.getAllCourses = async function (req, res) {
    try {
        const result = await examRegulationsService.getAllCourses();
        if (result) {
            logger.info('Courses for all exam regulation fetched');
            return res.send(result);
        }
        throw new InvalidParamError(EXAM_REGULATIONS, id);
    } catch (err) {
        errorHandler(err, res);
    }
};
