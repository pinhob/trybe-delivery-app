const { User } = require('../database/models');

const authService = require('./authService');

const { errorObject } = require('../utils/errorObject');
const ERROR = require('../utils/messagesError');

const login = async (name, password) => {
  if (!name || !password) throw (errorObject(ERROR.MESSAGE_INV_FIELDS, ERROR.STATUS_BAD_REQUEST));

  const userExists = await User.findOne({ where: { name } });
  if (!userExists || password !== userExists.password) {
    throw (errorObject(ERROR.MESSAGE_INV_FIELDS, ERROR.STATUS_BAD_REQUEST));
  }

  const { id, email, role } = userExists;

  const token = authService.genToken({ id, name, email, role });

  return { name, email, role, token };
};

module.exports = {
  login,
};
