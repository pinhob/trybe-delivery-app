const Joi = require('joi');

const { User } = require('../database/models');

const authService = require('./authService');

const { errorObject } = require('../utils/errorObject');

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
    err.status = 400;
    return (err);
  }

  const nameAlreadyExists = await User.findOne({ where: { name } });
  if (nameAlreadyExists) return (errorObject('Name user already registered', 409));
  const emailAlreadyExists = await User.findOne({ where: { email } });
  if (emailAlreadyExists) return (errorObject('Email user already registered', 409));

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
    throw (errorObject('User is not administrator', 409));
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
  if (!result) throw (errorObject('User does not exist', 404));
  return result;
};

module.exports = {
  create,
  getAll,
  getByName,
};
