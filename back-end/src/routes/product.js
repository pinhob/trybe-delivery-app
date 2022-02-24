const express = require('express');

const productRouter = express.Router();

const auth = require('../middlewares/auth');

const productControllers = require('../controllers/product');

productRouter.get('/', auth, productControllers.getAll);

module.exports = productRouter;
