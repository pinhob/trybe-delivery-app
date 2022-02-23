const express = require('express');

const userRouter = express.Router();

const auth = require('../middlewares/auth');

const userControllers = require('../controllers/user');

userRouter.post('/', userControllers.create);
userRouter.get('/', auth, userControllers.getAll);
userRouter.get('/:id', auth, userControllers.getById);

module.exports = userRouter;
