const express = require('express');

const userRouter = express.Router();

const userControllers = require('../controllers/user');

userRouter.post('/', userControllers.create);
userRouter.get('/', userControllers.getAll);

module.exports = userRouter;
