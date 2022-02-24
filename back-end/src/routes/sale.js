const express = require('express');

const saleRouter = express.Router();

const auth = require('../middlewares/auth');

const saleControllers = require('../controllers/sale');

saleRouter.post('/', auth, saleControllers.create);
saleRouter.get('/', auth, saleControllers.getAll);
saleRouter.get('/:id', auth, saleControllers.getById);
saleRouter.put('/:id', auth, saleControllers.update);
saleRouter.put('/:id/status', auth, saleControllers.updateStatus);

module.exports = saleRouter;
