const Joi = require('joi');

const {
  user: User, sale: Sale, product: Product, salesProduct: SalesProduct,
} = require('../database/models');

const { errorObject } = require('../utils/errorObject');
const ERROR = require('../utils/messagesError');

const saleSchema = Joi.object({
  userId: Joi.number().required(),
  sellerId: Joi.number().required(),
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

const getQueryFilters = (seller, status, user) => {
  const query = {};
  if (seller !== '') query.sellerId = seller;
  if (seller === 'null') query.sellerId = null;
  if (status !== '') query.status = status;
  if (user !== '') query.userId = user;
  return query;
};

const includeObjectSale = [
  { model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: User, as: 'seller', attributes: { exclude: ['password'] } },
  { model: Product, as: 'products', through: { attributes: ['quantity'] } },
];

const createSalesProducts = async (saleId, products) => products.map(async (product) => {
  const { productId, quantity } = product;
  await SalesProduct.create({ saleId, productId, quantity });
});

const create = async (sale) => {
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products } = sale;
  const { error } = saleSchema
    .validate({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status });
  if (error) {
    const err = new Error(error.details.map((errorObj) => errorObj.message).toString());
    err.code = 'invalid_data';
    err.status = ERROR.STATUS_BAD_REQUEST;
    throw (err);
  }

  const productsPromise = await validateProducts(products);
  await Promise.all(productsPromise);

  const resultCreate = await Sale
    .create({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status });

  const createSalesProductsPromise = await createSalesProducts(resultCreate.id, products);
  await Promise.all(createSalesProductsPromise);

  const result = await Sale.findByPk(resultCreate.id, { include: includeObjectSale });

  if (!result) throw (errorObject(ERROR.MESSAGE_SALE_NOT_EXISTS, ERROR.STATUS_BAD_REQUEST));

  return result;
};

const getAll = async (seller, status, user) => {
  let result = [];

  if (seller === '' && status === '' && user === '') {
    result = await Sale.findAll({
      include: includeObjectSale,
    });
  } else {
    const query = getQueryFilters(seller, status, user);
    result = await Sale.findAll({ where: query,
      include: includeObjectSale,
    });
  }
  return result;
};

const getById = async (id) => {
  const result = await Sale.findByPk(id, {
    include: includeObjectSale,
  });

  if (!result) throw (errorObject(ERROR.MESSAGE_SALE_NOT_EXISTS, ERROR.STATUS_NOT_FOUND));

  return result;
};

const update = async ({
  id, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products }) => {
  const { error } = saleSchema
    .validate({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status });
  if (error) {
    const err = new Error(error.details.map((errorObj) => errorObj.message).toString());
    err.code = 'invalid_data';
    err.status = ERROR.STATUS_BAD_REQUEST;
    throw (err);
  }

  const productsPromise = await validateProducts(products);
  await Promise.all(productsPromise);

  await Sale.update({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status,
  }, { where: { id } });

  await SalesProduct.destroy({ where: { saleId: id } });

  const createSalesProductsPromise = await createSalesProducts(id, products);
  await Promise.all(createSalesProductsPromise);

  const result = await Sale.findByPk(id, { include: includeObjectSale });

  return result;
};

const updateStatus = async (id, status) => {
  if (!status || status === '') {
    throw (errorObject(ERROR.MESSAGE_INV_STATUS, ERROR.STATUS_BAD_REQUEST));
  }
  
  const saleExists = await Sale.findByPk(id);
  if (!saleExists) throw (errorObject(ERROR.MESSAGE_SALE_NOT_EXISTS, ERROR.STATUS_NOT_FOUND));

  await Sale.update({ status }, { where: { id } });

  const result = await Sale.findByPk(id, { include: includeObjectSale });

  return result;
};

const exclude = async (id, userId, role) => {
  const saleExists = await Sale.findByPk(id);
  if (!saleExists) throw (errorObject(ERROR.MESSAGE_SALE_NOT_EXISTS, ERROR.STATUS_NOT_FOUND));

  if (saleExists.userId !== userId && role !== 'administrator') {
    throw (errorObject(ERROR.MESSAGE_UNAUTHORIZED, ERROR.STATUS_UNAUTHORIZED));
  }

  const result = Sale.destroy({ where: { id } });
  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  updateStatus,
  exclude,
};
