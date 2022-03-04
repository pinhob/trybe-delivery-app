const md5 = require('md5');

const { user: User } = require('../database/models');
const authService = require('./authService');

const { errorObject } = require('../utils/errorObject');
const ERROR = require('../utils/messagesError');

const login = async (email, password) => {
  console.log(email, password);

  if (!email || !password) throw (errorObject(ERROR.MESSAGE_INV_FIELDS, ERROR.STATUS_NOT_FOUND));

  console.log(password);

  const md5Password = md5(password);

  console.log('md5', md5Password);

  const userExists = await User.findOne({ where: { email } });
  if (!userExists || md5Password !== userExists.password) {
    throw (errorObject(ERROR.MESSAGE_INV_FIELDS, ERROR.STATUS_NOT_FOUND));
  }

  const { id, name, role } = userExists;

  const token = authService.genToken({ id, name, email, role });

  return { name, email, role, token };
};

module.exports = {
  login,
};
