const express = require('express');

const router = express.Router();

const userRouter = require('./user');
const loginRouter = require('./login');
const productsRouter = require('./product');

router.use('/users', userRouter);
router.use('/login', loginRouter);
router.use('/products', productsRouter);

module.exports = router;
