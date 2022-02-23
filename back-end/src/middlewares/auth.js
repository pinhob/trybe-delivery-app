const authService = require('../services/authService');

const { errorObject } = require('../utils/errorObject');

module.exports = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw errorObject('Token not found', 401);
    }
    const verifyAuth = authService.verifyToken(authorization);
    if (!verifyAuth) {
      throw errorObject('Expired or invalid token', 401);
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
