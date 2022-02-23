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

module.exports = {
  create,
};
