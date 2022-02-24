const express = require('express');

const productRouter = express.Router();

<<<<<<< HEAD
const productControllers = require('../controllers/products');

// productRouter.post('/', productControllers.create);
productRouter.get('/', productControllers.getAll);
productRouter.get('/:id', productControllers.getById);
=======
const auth = require('../middlewares/auth');

const productControllers = require('../controllers/product');

productRouter.get('/', auth, productControllers.getAll);
productRouter.get('/:id', auth, productControllers.getById);
>>>>>>> 7a12d84d1369ca547c6a283ce2524808e3aaa3d8

module.exports = productRouter;
