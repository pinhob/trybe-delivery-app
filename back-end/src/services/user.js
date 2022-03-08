const Joi = require('joi');
const { Op } = require('sequelize');
const md5 = require('md5');

const { user: User } = require('../database/models');

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

  const userAlreadyExists = await User.findOne({
    where: {
      [Op.or]: [
        { name },
        { email },
      ],
    },
  });
  if (userAlreadyExists) return (errorObject(ERROR.MESSAGE_CONFLICT_USER, ERROR.STATUS_CONFLICT));

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

  if (role !== 'customer' && !isLoggedUserAdministrator(loggedUser)) {
    throw (errorObject(ERROR.MESSAGE_NOT_ADMIN, ERROR.STATUS_CONFLICT));
  }

  console.log(isLoggedUserAdministrator(loggedUser));
  
  const md5Password = md5(password);

  const { id } = await User.create({ name, email, password: md5Password, role });
  const token = authService.genToken({ id, name, email, role });
  return { name, email, role, token };
};

const getAll = async () => {
  const result = await User.findAll({ attributes: {
      exclude: ['password'] } });
  return result;
};

const getByName = async (name) => {
  const result = await User.findOne({ where: { name } });
  if (!result) throw (errorObject(ERROR.MESSAGE_USER_NOT_EXISTS, ERROR.STATUS_NOT_FOUND));
  return result;
};

const getById = async (id, loggedUser) => {
  if (loggedUser.id !== parseInt(id, 10) && !isLoggedUserAdministrator(loggedUser)) {
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

const getSellers = async () => {
  const result = await User
    .findAll({
      where: { role: 'seller' },
      attributes: { exclude: ['password'] },
    });
  return result;
};

const exclude = async (id, loggedUser) => {
  const userExists = await User.findByPk(id);
  if (!userExists) throw (errorObject(ERROR.MESSAGE_USER_NOT_EXISTS, ERROR.STATUS_NOT_FOUND));

  if (loggedUser.id !== parseInt(id, 10) && !isLoggedUserAdministrator(loggedUser)) {
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
  getSellers,
  exclude,
};
