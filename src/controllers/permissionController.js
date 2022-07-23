const permissionService = require("../services/permissionService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions");
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg= require("../util/logMessages")
const permission = require("../util/constants/tableNames").permission

exports.getAllPermissions = async function (req, res) {
  try {
    res.send(await permissionService.getAllPermissions());
    logger.info(msg.fetchedAll(permission));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getPermissionById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await permissionService.getPermissionById(id);
    if (result) {
      logger.info(msg.fetched(permission, id));
      return res.send(result);
    }
    throw new InvalidParamError(permission, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewPermission = async function (req, res, next) {
  try {
    await permissionService.createNewPermission(req.body)
    res.status(201).send("OK");
    logger.info(msg.created(permission));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updatePermission = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await permissionService.updatePermission(id, req.body)))
      throw new InvalidParamError(permission, id);
    logger.info(msg.updated(permission, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deletePermissionById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await permissionService.deletePermissionById(id)))
      throw new InvalidParamError(permission, id);
    logger.info(msg.deleted(permission, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};
