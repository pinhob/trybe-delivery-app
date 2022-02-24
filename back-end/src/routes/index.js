const express = require('express');

const router = express.Router();

const userRouter = require('./user');
<<<<<<< HEAD
const productRouter = require('./product');

router.use('/users', userRouter);
router.use('/products', productRouter);
=======
const loginRouter = require('./login');
const productsRouter = require('./product');
const salesRouter = require('./sale');

router.use('/users', userRouter);
router.use('/login', loginRouter);
router.use('/products', productsRouter);
router.use('/sales', salesRouter);
>>>>>>> 7a12d84d1369ca547c6a283ce2524808e3aaa3d8

module.exports = router;
