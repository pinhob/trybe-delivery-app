const express = require('express');

const router = express.Router();

const userRouter = require('./user');
const loginRouter = require('./login');
const productsRouter = require('./product');
const salesRouter = require('./sale');

router.use('/users', userRouter);
router.use('/login', loginRouter);
router.use('/products', productsRouter);
router.use('/sales', salesRouter);

module.exports = router;
