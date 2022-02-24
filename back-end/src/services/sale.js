const Joi = require('joi');

const { User, Sale, Product, SalesProduct } = require('../database/models');

const { errorObject } = require('../utils/errorObject');
const ERROR = require('../utils/messagesError');

const saleSchema = Joi.object({
  userId: Joi.number().required(),
  totalPrice: Joi.number().precision(2).required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
  status: Joi.string().required(),
});

const validateProducts = async (products) => products.map(async (product) => {
  const productExists = await Product.findByPk(product.productId);
  if (!productExists) {
    throw (errorObject(ERROR.MESSAGE_PROD_NOT_EXISTS, ERROR.STATUS_BAD_REQUEST));
  }
  if (product.quantity < 1) {
    throw (errorObject(ERROR.MESSAGE_PROD_NOT_QTT, ERROR.STATUS_BAD_REQUEST));
  }
});

const create = async (sale) => {
  const { userId, totalPrice, deliveryAddress, deliveryNumber, status, products } = sale;
  const { error } = saleSchema
    .validate({ userId, totalPrice, deliveryAddress, deliveryNumber, status });
  if (error) {
    const err = new Error(error.details.map((errorObj) => errorObj.message).toString());
    err.code = 'invalid_data';
    err.status = ERROR.STATUS_BAD_REQUEST;
    throw (err);
  }

  const productsPromise = await validateProducts(products);
  await Promise.all(productsPromise);

  const result = await Sale
    .create({ userId, totalPrice, deliveryAddress, deliveryNumber, status });

  await products.map(async (product) => {
    const { productId, quantity } = product;
    await SalesProduct.create({ saleId: result.id, productId, quantity });
  });

  return result;
};

module.exports = {
  create,
};
