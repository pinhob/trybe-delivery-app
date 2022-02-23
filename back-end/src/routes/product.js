const express = require('express');

const productRouter = express.Router();

const productControllers = require('../controllers/products');

// productRouter.post('/', productControllers.create);
productRouter.get('/', productControllers.getAll);
productRouter.get('/:id', productControllers.getById);

module.exports = productRouter;
