// const Joi = require('joi');

const { Product } = require('../database/models');

const { errorObject } = require('../utils/errorObject');

// const userSchema = Joi.object({
//   name: Joi.string().min(12).required(),
//   email: Joi.string().email({ minDomainSegments: 2 }).required(),
//   password: Joi.string().min(6).required(),
//   role: Joi.string(),
// });

const getAll = async () => {
  const result = await Product.findAll();
  return result;
};

const getById = async (id) => {
  const product = await Product.findByPk(id, {
    attributes: {
      exclude: ['url_image'],
    },
  });
  if (!product) throw (errorObject('Product does not exist', 404));
  return product;
};

module.exports = {
  getAll,
  getById,
};
