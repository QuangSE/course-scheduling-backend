const basicCrudService = require('../services/basicCrudService');
const logger = require('../util/logger');
const errorHandler = require('../middlewares/errorHandler');
const { checkIdParam } = require('../util/utilFunctions');
const InvalidParamError = require('../util/customErrors').InvalidParameterError;
const msg = require('../util/logMessages');
/* const item = require("../util/constants/tableNames").item */

exports.getAllItems = async function (req, res, model) {
    try {
        res.send(await basicCrudService.getAllitems());
        logger.info(msg.fetchedAll(item));
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.getitemById = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id); //throws an error if id is not a number
        const result = await basicCrudService.getitemById(id);
        if (result) {
            logger.info(msg.fetched(item, id));
            return res.send(result);
        }
        throw new InvalidParamError(item, id);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.createNewitem = async function (req, res, next) {
    try {
        await basicCrudService.createNewitem(req.body);
        res.status(201).send('OK');
        logger.info(msg.created(item));
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.updateitem = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id); //throws an error if id is not a number
        if (!(await basicCrudService.updateitem(id, req.body)))
            throw new InvalidParamError(item, id);
        logger.info(msg.updated(item, id));
        res.sendStatus(200);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.updateDocent = async function (req, res) {
    try {
        const id = req.params.id;
        const docentId = req.params.docentId;
        checkIdParam(id); //throws an error if id is not a number
        checkIdParam(docentId);
        if (!(await basicCrudService.updateDocent(id, docent_id)))
            throw new InvalidParamError(item, id); //FIXME: throw error when docentId doesnt exist
        logger.info(msg.updated(item, id));
        res.sendStatus(200);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.updatePermission = async function (req, res) {
    try {
        const id = req.params.id;
        const permissionId = req.params.docentId;
        checkIdParam(id); //throws an error if id is not a number
        checkIdParam(docentId);
        if (!(await basicCrudService.updatePermission(id, permissionId)))
            throw new InvalidParamError(item, id); //FIXME: throw error when docentId doesnt exist
        logger.info(msg.updated(item, id));
        res.sendStatus(200);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.deleteitemById = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id); //throws an error if id is not a number
        if (!(await basicCrudService.deleteitemById(id))) throw new InvalidParamError(item, id);
        logger.debug(await basicCrudService.deleteitemById(id));
        logger.info(msg.deleted(item, id));
        res.sendStatus(200);
    } catch (err) {
        errorHandler(err, res);
    }
};
