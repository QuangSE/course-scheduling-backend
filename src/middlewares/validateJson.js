const logger = require('../util/logger')
const errorHandler = require('./errorHandler')
const reqMethods = require('../util/constants/reqMethods')
const InvalidReqBodyError = require('../util/customErrors').InvalidReqBodyError

//verify that the json object is not empty
//use for POST and PUT requests only
const validateJson = (req, res, next) => {
    try {
        if (req.method === reqMethods.GET || req.method === reqMethods.DELETE) {
            return next()
        }
        logger.debug('Validating JSON Object')
        if (!Object.keys(req.body).length) {
            throw new InvalidReqBodyError()
        }
        logger.debug('Initial JSON validation passed')
        next()
    } catch (err) {
        errorHandler(err, res)
    }
}

module.exports = validateJson
