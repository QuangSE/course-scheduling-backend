const docentService = require("../services/docentService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const ut = require("../util/utilFunctions");
const InvalidParamError = require("../util/customErrors").InvalidParameterError;
const msg= require("../util/constants/logMessages")
const docent = require("../util/constants/tableNames").docent

exports.getAllDocents = async function (req, res) {
  try {
    res.send(await docentService.getAllDocents());
    logger.info(msg.fetchedAll(docent));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getDocentById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    const result = await docentService.getDocentById(id);
    if (result) {
      logger.info(msg.fetched(docent, id));
      return res.send(result);
    }
    throw new InvalidParamError(docent, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewDocent = async function (req, res, next) {
  try {
    await docentService.createNewDocent(req.body)
    res.status(201).send("OK");
    logger.info(msg.created(docent));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateDocent = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await docentService.updateDocent(id, req.body)))
      throw new InvalidParamError(docent, id);
    logger.info(msg.updated(docent, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

// const jsonobj = {
//   first_name: "Pedra",
//   last_name: "Barclay",
//   email: "Pedro.Barclay@hs-kl.de",
//   title: "Prof. Dr.",
//   profession: "Professor",
// };

exports.deleteDocentById = async function (req, res) {
  try {
    const id = req.params.id;
    ut.checkIdParam(id); //throws an error if id is not a number
    if (!(await docentService.deleteDocentById(id)))
      throw new InvalidParamError(docent, id);
    logger.info(msg.deleted(docent, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getDocentByLastName = async function (req, res) {
  try {
    logger.info("Fetching docent by name " + req.params.lastname);
    res.send(await docentService.getDocentByLastName(req.params.lastname));
  } catch (err) {
    errorHandler(err, res);
  }
};
