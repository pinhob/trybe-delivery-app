const express = require('express');

const userRouter = express.Router();

const auth = require('../middlewares/auth');

const userControllers = require('../controllers/user');

userRouter.post('/', userControllers.create);
userRouter.post('/admin/create', auth, userControllers.create);
userRouter.get('/', auth, userControllers.getAll);
userRouter.get('/sellers', auth, userControllers.getSellers);
userRouter.get('/:id', auth, userControllers.getById);
userRouter.delete('/:id', auth, userControllers.exclude);

module.exports = userRouter;
