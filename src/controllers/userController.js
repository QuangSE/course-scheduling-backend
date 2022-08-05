const userService = require('../services/userService');
const docentService = require('../services/docentService');
const logger = require('../util/logger');
const errorHandler = require('../middlewares/errorHandler');
const { checkIdParam } = require('../util/utilFunctions');
const InvalidParamError = require('../util/customErrors').InvalidParameterError;
const msg = require('../util/logMessages');
const USER = require('../util/constants/tableNames').USER;

exports.getAllUsers = async function (req, res) {
  try {
    res.send(await userService.getAllUsers());
    logger.info(msg.fetchedAll(USER));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getUserById = async function (req, res) {
  try {
    const id = req.params.id;
    checkIdParam(id); //throws an error if id is not a number
    const result = await userService.getUserById(id);
    if (result) {
      logger.info(msg.fetched(USER, id));
      return res.send(result);
    }
    throw new InvalidParamError(USER, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getUserByUsername = async function (req, res) {
  try {
    const username = req.params.username;
    const result = await userService.getUserByUsername(username);
    if (result) {
      logger.info(msg.fetched(USER, username));
    }
    return res.send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getDocentOfUser = async function (req, res) {
  try {
    const id = req.params.id;
    checkIdParam(id); //throws an error if id is not a number
    const result = await userService.getDocentOfUser(id);
    if (result) {
      logger.info(msg.fetched(USER, id));
      return res.send(result);
    }
    throw new InvalidParamError(USER, id);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.createNewUser = async function (req, res) {
  try {
    const userData = req.body;
    userData.permission = userData.permission ? userData.permission : 2;
    const result = await userService.createNewUser(req.body);
    res.status(201).send(result);
    logger.info(msg.created(USER));
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateUser = async function (req, res) {
  try {
    const id = req.params.id;
    checkIdParam(id); //throws an error if id is not a number
    if (!(await userService.updateUser(id, req.body)))
      throw new InvalidParamError(USER, id);
    logger.info(msg.updated(USER, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.updateMyCredentials = async function (req, res) {
  try {
    const id = req.session.user.user_id;
    if (!(await userService.updateUser(id, req.body)))
      throw new InvalidParamError(USER, id);
    logger.info(msg.updated(USER, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteUserById = async function (req, res) {
  try {
    const id = req.params.id;
    checkIdParam(id); //throws an error if id is not a number
    if (!(await userService.deleteUserById(id)))
      throw new InvalidParamError(USER, id);
    logger.info(msg.deleted(USER, id));
    res.sendStatus(200);
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getTotalLsws = async function (req, res) {
  try {
    const docentId = req.session.user.docent_id;
    const result = await docentService.getCoursesByDocentId(docentId);
    let totalLsws = 0;
    if (result.docentCourses.length > 0) {
      for (const docentCourse of result.docentCourses) {
        if (docentCourse.registered === 1) {
          totalLsws += docentCourse.course.lsws;
        }
      }
    }
    res.send({ totalLsws });
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.getVisibleCourses = async function (req, res) {
  try {
    const docentId = req.session.user.docent_id;
    const result = await docentService.getCoursesWithModulesByDocentId(
      docentId
    );
    let visibleCourses = [];
    if (result.docentCourses.length > 0) {
      for (const docentCourse of result.docentCourses) {
        if (isVisible(docentCourse.course.module)) {
          visibleCourses.push(docentCourse);
        }
      }
    }
    res.send({ visibleCourses });
  } catch (err) {
    errorHandler(err, res);
  }
};

function isVisible(module) {
  const moduleVisibility = module.visibility;
  //TODO: ask when to display the module
  const currentMonth = new Date().getMonth();
  if (currentMonth >= 5 && currentMonth <= 11) {
    if (moduleVisibility == 1) {
      return true;
    } else {
      return false;
    }
  } else {
    if (moduleVisibility == 1) {
      return false;
    } else {
      return true;
    }
  }
}
