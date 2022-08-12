const jwt = require('jsonwebtoken');

const authenticationService = require('../services/authenticationService');
const userService = require('../services/userService');
const docentService = require('../services/docentService');
const logger = require('../util/logger');
const errorHandler = require('../middlewares/errorHandler');
const {
  InvalidReqBodyError,
  InvalidUsernameError,
  WrongPasswordError,
} = require('../util/customErrors');
const { info } = require('../util/logger');

exports.createSession = async function (req, res) {
  try {
    const loginDetails = req.body;
    if (!('username' in loginDetails) || !('password' in loginDetails)) {
      throw new InvalidReqBodyError("No 'username' and/or 'password' passed");
    }

    const username = loginDetails.username;
    const result = await authenticationService.verifyLogin(loginDetails);

    if (result == null) {
      throw new InvalidUsernameError(username);
    }
    if (!result) {
      throw new WrongPasswordError(username);
    }
    logger.info('Session created for user ' + result.username);

    const userInfos = {
      user_id: result.user_id,
      username: result.username,
      permission_id: result.permission_id,
      docent_id: result.docent_id,
    };

    req.session.user = userInfos;

    res.send(req.session.user);

    /*  const accessToken = await generateAccessToken(username);

    res.cookie("token", accessToken, cookieOptions).send({ accessToken: accessToken });

    logger.info(`'${username}' succesfull login`); */
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getSession = async function (req, res) {
  try {
    if (req.session.user) {
      logger.debug('session exist for user: ' + req.session.user.username);
      res.send({ session: true, user: req.session.user });
    } else {
      logger.debug('session not exist');
      res.send({ session: false });
    }
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteSession = async function (req, res) {
  try {
    if (!req.session.user) {
      return res.send('Session already deleted');
    }
    logger.info(`Session deleted for '${req.session.user.username}'`);
    req.session = null;
    res.status(204).send('Session deleted');
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getExistingDocentByName = async function (req, res) {
  try {
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    logger.debug(JSON.stringify(req.body));
    let docent = null;
    if (!firstName) {
      docent = await docentService.getDocentByLastName(lastName);
    } else {
      docent = await docentService.getDocentByName(lastName, firstName);
    }
    if (docent) {
      res.send({ docentId: docent.docent_id });
    } else {
      res.send(docent);
    }
  } catch (err) {
    errorHandler(err, res);
  }
};
