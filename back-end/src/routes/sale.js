const express = require('express');

const saleRouter = express.Router();

const auth = require('../middlewares/auth');

const saleControllers = require('../controllers/sale');

saleRouter.post('/', auth, saleControllers.create);

module.exports = saleRouter;
