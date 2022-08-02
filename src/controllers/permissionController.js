const permissionService = require('../services/permissionService');
const logger = require('../util/logger');
const errorHandler = require('../middlewares/errorHandler');
const { checkIdParam } = require('../util/utilFunctions');
const InvalidParamError = require('../util/customErrors').InvalidParameterError;
const msg = require('../util/logMessages');
const PERMISSION = require('../util/constants/tableNames').PERMISSION;

exports.getAllPermissions = async function (req, res) {
    try {
        res.send(await permissionService.getAllPermissions());
        logger.info(msg.fetchedAll(PERMISSION));
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.getPermissionById = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id); //throws an error if id is not a number
        const result = await permissionService.getPermissionById(id);
        if (result) {
            logger.info(msg.fetched(PERMISSION, id));
            return res.send(result);
        }
        throw new InvalidParamError(PERMISSION, id);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.createNewPermission = async function (req, res, next) {
    try {
        result = await permissionService.createNewPermission(req.body);
        res.status(201).send(result);
        logger.info(msg.created(PERMISSION));
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.updatePermission = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id); //throws an error if id is not a number
        if (!(await permissionService.updatePermission(id, req.body)))
            throw new InvalidParamError(PERMISSION, id);
        logger.info(msg.updated(PERMISSION, id));
        res.sendStatus(200);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.deletePermissionById = async function (req, res) {
    try {
        const id = req.params.id;
        checkIdParam(id); //throws an error if id is not a number
        if (!(await permissionService.deletePermissionById(id)))
            throw new InvalidParamError(PERMISSION, id);
        logger.info(msg.deleted(PERMISSION, id));
        res.sendStatus(200);
    } catch (err) {
        errorHandler(err, res);
    }
};
