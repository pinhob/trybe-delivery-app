const express = require('express');
const bodyParser = require('body-parser');

const router = require('../routes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(router);
app.use(errorHandler);

module.exports = app;
