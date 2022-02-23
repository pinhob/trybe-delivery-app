const express = require('express');

const userRouter = express.Router();

const userControllers = require('../controllers/user');

userRouter.post('/', userControllers.create);

module.exports = userRouter;
