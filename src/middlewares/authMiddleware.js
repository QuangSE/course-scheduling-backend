const logger = require('../util/logger');

function auth(permissions) {
  return (req, res, next) => {
    const session = req.session;
    logger.debug('session: ' + JSON.stringify(req.session));
    if (!session.user) {
      logger.warn(
        'Attempt to access unauthorized API endpoint from unknown user'
      );
      return res
        .status(401)
        .send({ name: 'Unauthorized', message: 'Not authenticated' });
    }

    const reqPermission = req.session.user.permission_id;
    logger.debug(reqPermission);
    logger.debug('authorized request ' + permissions.includes(reqPermission));
    if (permissions.includes(reqPermission)) {
      next();
    } else {
      logger.warn(
        'Attempt to access unauthorized API endpoint from user: ' +
          req.session.user.username
      );
      res.status(403);
      return res.send({ name: 'Forbidden', message: 'Access denied' });
    }
  };
}

module.exports = { auth };
