const Joi = require('joi');

const { User } = require('../database/models');

const authService = require('./authService');

const { errorObject } = require('../utils/errorObject');
const ERROR = require('../utils/messagesError');

const userSchema = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string(),
});

const validateDataUser = async (name, email, password, role) => {
  const { error } = userSchema.validate({ name, email, password, role });
  if (error) {
    const err = new Error(error.details.map((errorObj) => errorObj.message).toString());
    err.code = 'invalid_data';
    err.status = ERROR.STATUS_BAD_REQUEST;
    return (err);
  }

  const nameAlreadyExists = await User.findOne({ where: { name } });
  if (nameAlreadyExists) return (errorObject(ERROR.MESSAGE_CONFLICT_NAME, ERROR.STATUS_CONFLICT));
  const emailAlreadyExists = await User.findOne({ where: { email } });
  if (emailAlreadyExists) return (errorObject(ERROR.MESSAGE_CONFLICT_EMAIL, ERROR.STATUS_CONFLICT));

  return true;
};

const isLoggedUserAdministrator = (loggedUser) => {
  if (!loggedUser || loggedUser.role !== 'administrator') {
    return false;
  }
  return true;
};

const create = async ({ name, email, password, role, loggedUser }) => {
  const validDataUser = await validateDataUser(name, email, password, role);
  if (validDataUser.message) throw (validDataUser);

  if (role !== 'customer' || isLoggedUserAdministrator(loggedUser)) {
    throw (errorObject(ERROR.MESSAGE_NOT_ADMIN, ERROR.STATUS_CONFLICT));
  }
  
  const { id } = await User.create({ name, email, password, role });
  const token = authService.genToken({ id, name, email, role });
  return { name, email, role, token };
};

const getAll = async () => {
  const result = await User.findAll();
  return result;
};

const getByName = async (name) => {
  const result = await User.findOne({ where: { name } });
  if (!result) throw (errorObject(ERROR.MESSAGE_USER_NOT_EXISTS, ERROR.STATUS_NOT_FOUND));
  return result;
};

const getById = async (id, loggedUser) => {
  if (loggedUser.id !== id && isLoggedUserAdministrator(loggedUser)) {
    throw (errorObject(ERROR.MESSAGE_BAD_REQUEST, ERROR.STATUS_FORBIDDEN));
  }
  const result = await User.findByPk(id, {
    attributes: {
      exclude: ['password'],
    },
  });
  if (!result) throw (errorObject(ERROR.MESSAGE_USER_NOT_EXISTS, ERROR.STATUS_NOT_FOUND));
  return result;
};

const exclude = async (id, loggedUser) => {
  const userExists = await User.findByPk(id);
  if (!userExists) throw (errorObject(ERROR.MESSAGE_USER_NOT_EXISTS, ERROR.STATUS_NOT_FOUND));

  if (userExists.id !== id && isLoggedUserAdministrator(loggedUser)) {
    throw (errorObject(ERROR.MESSAGE_BAD_REQUEST, ERROR.STATUS_FORBIDDEN));
  }

  const result = User.destroy({ where: { id } });
  return result;
};

module.exports = {
  create,
  getAll,
  getByName,
  getById,
  exclude,
};
