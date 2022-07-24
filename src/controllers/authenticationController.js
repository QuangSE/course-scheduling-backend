const jwt = require("jsonwebtoken");

const authenticationService = require("../services/authenticationService");
const userService = require("../services/userService");
const logger = require("../util/logger");
const errorHandler = require("../middlewares/errorHandler");
const {
  InvalidReqBodyError,
  InvalidUsernameError,
  WrongPasswordError,
} = require("../util/customErrors");

exports.verifyLogin = async function (req, res) {
  try {
    const loginDetails = req.body;
    if (!("username" in loginDetails) || !("password" in loginDetails)) {
      throw new InvalidReqBodyError("No 'username' and/or 'password' passed");
    }

    const username = loginDetails.username;
    const result = await authenticationService.verifyLogin(loginDetails);
    logger.info(JSON.stringify(result));

    if (result == null) {
      throw new InvalidUsernameError(username);
    }
    if (!result) {
      throw new WrongPasswordError(username);
    }

    req.session.user = result;

    res.send(req.session.user);

    /*  const accessToken = await generateAccessToken(username);

    res.cookie("token", accessToken, cookieOptions).send({ accessToken: accessToken });

    logger.info(`'${username}' succesfull login`); */
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getLoginStatus = async function (req, res) {
  try {
    if (req.session.user) {
      logger.debug("session exist for user: " + req.session.user.username)
      res.send({ session: true, user: req.session.user });
    } else {
      logger.debug("session not exist");
      res.send({ session: false});
    }

  } catch (err) {
    errorHandler(err, res);
  }
};

exports.logout = async function (req, res) {
  try {
    logger.info(`'${req.session.user.username}' logged out successfully`)
    req.session = null;
    res.status(204).send("Successfully logged out")

  } catch (err) {
    errorHandler(err, res);
  }
};

/* const generateAccessToken = async function (username) {
  try {
    const userData = await userService.getUserByUsername(username);
    const payload = {
      user_id: userData.user_id,
      username: userData.username,
      permission: userData.permission_id,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET); //TODO: add expiration
    logger.debug(`Access Token generated for user: '${username}'`);
    return accessToken;
  } catch (err) {
    logger.debug(err);
  }
};

const cookieOptions = {
  httpOnly: true,
  //secure: true; //https
};
 */