const express = require('express');

const loginRouter = express.Router();

const loginControllers = require('../controllers/login');

loginRouter.post('/', loginControllers.login);

module.exports = loginRouter;
