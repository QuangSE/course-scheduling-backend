const jwt = require('jsonwebtoken')
const logger = require('../util/logger')
const errorHandler = require('../middlewares/errorHandler')
const InvalidTokenError = require('../util/customErrors').InvalidTokenError

function authenticateToken(req, res, next) {
    try {
        const cookies = req.cookies
        const token = authHeader && cookies.token
        if (!token) {
            throw new InvalidTokenError(401, 'A token is required for authentication')
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) throw new InvalidTokenError()
            logger.debug('user: ' + JSON.stringify(user))
            req.user = user
            next()
        })
    } catch (err) {
        res.clearCookie('token')
        return errorHandler(err, res)
    }
}

function auth(permissions) {
    return (req, res, next) => {
        const session = req.session
        logger.debug('session: ' + JSON.stringify(req.session))
        if (!Object.keys(session).length) {
            logger.warn('Attempt to access unauthorized API endpoint from unknown user')
            return res.status(401).send('Unauthorized!')
        }

        const reqPermission = req.session.user.permission_id
        logger.debug(reqPermission)
        logger.debug('authorized request ' + permissions.includes(reqPermission))
        if (permissions.includes(reqPermission)) {
            next()
        } else {
            logger.warn(
                'Attempt to access unauthorized API endpoint from user: ' +
                    req.session.user.username
            )
            res.status(401)
            return res.send('Unauthorized')
        }
    }
}

module.exports = { authenticateToken, auth }
