const express = require('express');
const path = require('path');

const imagesRouter = express.Router();

imagesRouter.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, `../../public/${req.params.id}`));
});

module.exports = imagesRouter;
