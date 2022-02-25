const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { User } = require('../database/models');

const router = require('../routes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(`${__dirname}/public`));

app.get('/coffee', (_req, res) => res.status(418).end());

app.get('/', async (_req, res) => {
  const result = await User.findAll();
  res.status(200).json(result);
});

app.use(router);
app.use(errorHandler);

module.exports = app;
