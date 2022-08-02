const userService = require('../services/userService')
const logger = require('../util/logger')
const errorHandler = require('../middlewares/errorHandler')
const { checkIdParam } = require('../util/utilFunctions')
const InvalidParamError = require('../util/customErrors').InvalidParameterError
const msg = require('../util/logMessages')
const USER = require('../util/constants/tableNames').USER

exports.getAllUsers = async function (req, res) {
    try {
        res.send(await userService.getAllUsers())
        logger.info(msg.fetchedAll(USER))
    } catch (err) {
        errorHandler(err, res)
    }
}

exports.getUserById = async function (req, res) {
    try {
        const id = req.params.id
        checkIdParam(id) //throws an error if id is not a number
        const result = await userService.getUserById(id)
        if (result) {
            logger.info(msg.fetched(USER, id))
            return res.send(result)
        }
        throw new InvalidParamError(USER, id)
    } catch (err) {
        errorHandler(err, res)
    }
}

exports.getUserByUsername = async function (req, res) {
    try {
        const username = req.params.username
        const result = await userService.getUserByUsername(username)
        if (result) {
            logger.info(msg.fetched(USER, username))
        }
        return res.send(result)
    } catch (err) {
        errorHandler(err, res)
    }
}

exports.getDocentOfUser = async function (req, res) {
    try {
        const id = req.params.id
        checkIdParam(id) //throws an error if id is not a number
        const result = await userService.getDocentOfUser(id)
        if (result) {
            logger.info(msg.fetched(USER, id))
            return res.send(result)
        }
        throw new InvalidParamError(USER, id)
    } catch (err) {
        errorHandler(err, res)
    }
}

exports.createNewUser = async function (req, res) {
    try {
        const userData = req.body
        userData.permission = userData.permission ? userData.permission : 2
        const result = await userService.createNewUser(req.body)
        res.status(201).send(result)
        logger.info(msg.created(USER))
    } catch (err) {
        errorHandler(err, res)
    }
}

exports.updateUser = async function (req, res) {
    try {
        const id = req.params.id
        checkIdParam(id) //throws an error if id is not a number
        if (!(await userService.updateUser(id, req.body))) throw new InvalidParamError(USER, id)
        logger.info(msg.updated(USER, id))
        res.sendStatus(200)
    } catch (err) {
        errorHandler(err, res)
    }
}

exports.updateMyCredentials = async function (req, res) {
    try {
        const id = req.session.user.user_id
        if (!(await userService.updateUser(id, req.body))) throw new InvalidParamError(USER, id)
        logger.info(msg.updated(USER, id))
        res.sendStatus(200)
    } catch (err) {
        errorHandler(err, res)
    }
}

exports.deleteUserById = async function (req, res) {
    try {
        const id = req.params.id
        checkIdParam(id) //throws an error if id is not a number
        if (!(await userService.deleteUserById(id))) throw new InvalidParamError(USER, id)
        logger.info(msg.deleted(USER, id))
        res.sendStatus(200)
    } catch (err) {
        errorHandler(err, res)
    }
}
