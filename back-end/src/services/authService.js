const jwt = require('jsonwebtoken');

const fs = require('fs');

const API_SECRET = fs.readFileSync('../../jwt.evaluation.key');

const JWT_CONFIG = {
  expiresIn: 32600,
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign(data, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  genToken,
  verifyToken,
};
