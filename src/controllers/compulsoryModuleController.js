const compulsoryModuleService = require('../services/compulsoryModuleService');
const moduleService = require('../services/moduleService');
const errorHandler = require('../middlewares/errorHandler');
const { checkIdParam } = require('../util/utilFunctions');
const logger = require('../util/logger');
const InvalidParamError = require('../util/customErrors').InvalidParameterError;
const COMPULSORY_MODULE =
  require('../util/constants/tableNames').COMPULSORY_MODULE;

exports.getAllCompulsoryModules = async function (req, res) {
  try {
    res.send(await compulsoryModuleService.getAllCompulsoryModules());
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getCompulsoryModuleById = async function (req, res) {
  try {
    const id = req.params.id;
    checkIdParam(id);
    const result = await compulsoryModuleService.getCompulsoryModuleById(id);
    if (result) {
      return res.send(result);
    }
    throw new InvalidParamError(COMPULSORY_MODULE, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewCompulsoryModule = async function (req, res, next) {
  try {
    const result = await compulsoryModuleService.createNewCompulsoryModule(
      req.body
    );
    res.status(201).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateCompulsoryModule = async function (req, res) {
  try {
    const id = req.params.id;
    checkIdParam(id); //throws an error if id is not a number
    if (!(await compulsoryModuleService.updateCompulsoryModule(id, req.body)))
      throw new InvalidParamError(COMPULSORY_MODULE, id);
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteCompulsoryModuleById = async function (req, res) {
  try {
    const id = req.params.id;
    checkIdParam(id); //throws an error if id is not a number
    if (!(await compulsoryModuleService.deleteCompulsoryModuleById(id)))
      throw new InvalidParamError(COMPULSORY_MODULE, id);
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getOverview = async function (req, res) {
  try {
    const result = await moduleService.getCompulsoryModuleOverview();
    let overview = [];
    for (module of result) {
      if (module.compulsoryModuleMajors.length > 0) {
        overview.push(module);
      }
    }
    res.send(overview);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getCompulsoryModuleByIds = async function (req, res) {
  try {
    const moduleId = req.body.moduleId;
    const majorId = req.body.majorId;
    const result = await compulsoryModuleService.getCompulsoryModuleByIds(
      moduleId,
      majorId
    );
    return res.send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};
