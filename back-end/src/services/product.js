<<<<<<< HEAD
// const Joi = require('joi');

const { Product } = require('../database/models');

const { errorObject } = require('../utils/errorObject');

// const userSchema = Joi.object({
//   name: Joi.string().min(12).required(),
//   email: Joi.string().email({ minDomainSegments: 2 }).required(),
//   password: Joi.string().min(6).required(),
//   role: Joi.string(),
// });
=======
const { Product } = require('../database/models');

const { errorObject } = require('../utils/errorObject');
const ERROR = require('../utils/messagesError');
>>>>>>> 7a12d84d1369ca547c6a283ce2524808e3aaa3d8

const getAll = async () => {
  const result = await Product.findAll();
  return result;
};

const getById = async (id) => {
<<<<<<< HEAD
  const product = await Product.findByPk(id, {
    attributes: {
      exclude: ['url_image'],
    },
  });
  if (!product) throw (errorObject('Product does not exist', 404));
  return product;
=======
  const result = await Product.findByPk(id);
  if (!result) throw (errorObject(ERROR.MESSAGE_PROD_NOT_EXISTS, ERROR.STATUS_NOT_FOUND));
  return result;
>>>>>>> 7a12d84d1369ca547c6a283ce2524808e3aaa3d8
};

module.exports = {
  getAll,
  getById,
};
