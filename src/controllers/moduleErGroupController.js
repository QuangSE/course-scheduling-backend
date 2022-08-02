const moduleErGroupService = require('../services/moduleErGroupService')
const logger = require('../util/logger')
const errorHandler = require('../middlewares/errorHandler')
const { checkIdParam } = require('../util/utilFunctions')
const InvalidParamError = require('../util/customErrors').InvalidParameterError
const msg = require('../util/logMessages')
const MODULE_ER_GROUP = require('../util/constants/tableNames').MODULE_ER_GROUP

exports.getAllModuleErGroups = async function (req, res) {
    try {
        res.send(await moduleErGroupService.getAllModuleErGroups())
        logger.info(msg.fetchedAll(MODULE_ER_GROUP))
    } catch (err) {
        errorHandler(err, res)
    }
}

exports.getModuleErGroupById = async function (req, res) {
    try {
        const id = req.params.id
        checkIdParam(id) //throws an error if id is not a number
        const result = await moduleErGroupService.getModuleErGroupById(id)
        if (result) {
            logger.info(msg.fetched(MODULE_ER_GROUP, id))
            return res.send(result)
        }
        throw new InvalidParamError(MODULE_ER_GROUP, id)
    } catch (err) {
        errorHandler(err, res)
    }
}

exports.createNewModuleErGroup = async function (req, res) {
    try {
        const result = await moduleErGroupService.createNewModuleErGroup(req.body)
        res.status(201).send(result)
        logger.info(msg.created(MODULE_ER_GROUP))
    } catch (err) {
        errorHandler(err, res)
    }
}

exports.updateModuleErGroup = async function (req, res) {
    try {
        const id = req.params.id
        checkIdParam(id) //throws an error if id is not a number
        if (!(await moduleErGroupService.updateModuleErGroup(id, req.body)))
            throw new InvalidParamError(MODULE_ER_GROUP, id)
        logger.info(msg.updated(MODULE_ER_GROUP, id))
        res.sendStatus(200)
    } catch (err) {
        errorHandler(err, res)
    }
}

exports.deleteModuleErGroupById = async function (req, res) {
    try {
        const id = req.params.id
        checkIdParam(id) //throws an error if id is not a number
        if (!(await moduleErGroupService.deleteModuleErGroupById(id)))
            throw new InvalidParamError(MODULE_ER_GROUP, id)
        logger.info(msg.deleted(MODULE_ER_GROUP, id))
        res.sendStatus(200)
    } catch (err) {
        errorHandler(err, res)
    }
}

exports.getModuleErGroupByIds = async function (req, res) {
    try {
        //TODO: handle req.body error
        const er_goup_id = req.body.er_group_id
        const module_id = req.body.module_id
        console.log(er_goup_id, module_id)
        const result = await moduleErGroupService.getModuleErGroupByErGoupIdModuleId(
            er_goup_id,
            module_id
        )

        return res.send(result)
    } catch (err) {
        errorHandler(err, res)
    }
}

exports.getModuleErGroupsByErGroupId = async function (req, res) {
    try {
        //TODO: handle req.body error
        const er_goup_id = req.body.er_group_id
        const result = await moduleErGroupService.getModuleErGroupsByErGoupId(er_goup_id)
        return res.send(result)
    } catch (err) {
        errorHandler(err, res)
    }
}
