const authService = require('../services/authService');

const { errorObject } = require('../utils/errorObject');
const ERROR = require('../utils/messagesError');

module.exports = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(`REQ: ${req}`);
    console.log('passa pelo auth');
    if (!authorization) {
      throw errorObject(ERROR.MESSAGE_JWT_MISSING, ERROR.STATUS_UNAUTHORIZED);
    }
    const verifyAuth = authService.verifyToken(authorization);
    if (!verifyAuth) {
      throw errorObject(ERROR.MESSAGE_JWT, ERROR.STATUS_UNAUTHORIZED);
    }
    const { id, name, email, role } = verifyAuth;
    const loggedUser = { id, name, email, role };
    req.loggedUser = loggedUser;
    next();
  } catch (error) {
    console.log(`ERROR: auth middleware => ${error.message}`);
    return next(error);
  }
};
