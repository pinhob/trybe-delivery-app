const LoginService = require('../services/login');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await LoginService.login(email, password);
    return res.status(200).json(result);
  } catch (error) {
    console.log(`ERROR: POST login => ${error.message}`);
    return next(error);
  }
};

module.exports = {
  login,
};
