const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('../routes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(`${__dirname}/public`));

app.get('/coffee', (_req, res) => res.status(418).end());

app.get('/', async (_req, res) => {
  res.status(200).json('Dona Tereza - Delivery App');
});

app.use(router);
app.use(errorHandler);

module.exports = app;
