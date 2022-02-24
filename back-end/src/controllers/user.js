const UserServices = require('../services/user');

const create = async (req, res, next) => {
  try {
    const { body, loggedUser = null } = req;
    const { name, email, password, role = 'customer' } = body;
    const result = await UserServices.create({ name, email, password, role, loggedUser });
    return res.status(201).json(result);
  } catch (error) {
    console.log(`ERROR: POST createUser => ${error.message}`);
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const result = await UserServices.getAll();
    return res.status(200).json(result);
  } catch (error) {
    console.log(`ERROR: GET getAllUsers => ${error.message}`);
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { params, loggedUser } = req;
    const { id } = params;
    const result = await UserServices.getById(id, loggedUser);
    return res.status(200).json(result);
  } catch (error) {
    console.log(`ERROR: GET getUserById => ${error.message}`);
    return next(error);
  }
};

<<<<<<< HEAD
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await UserServices.login(email, password);
    return res.status(200).json(result);
  } catch (error) {
    console.log(`ERROR: GET login=> ${error.message}`);
=======
const exclude = async (req, res, next) => {
  try {
    const { params, loggedUser } = req;
    const { id } = params;
    await UserServices.exclude(id, loggedUser);
    return res.status(200).send();
  } catch (error) {
    console.log(`ERROR: DELETE deleteUser => ${error.message}`);
>>>>>>> 7a12d84d1369ca547c6a283ce2524808e3aaa3d8
    return next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
<<<<<<< HEAD
  login,
=======
  exclude,
>>>>>>> 7a12d84d1369ca547c6a283ce2524808e3aaa3d8
};
