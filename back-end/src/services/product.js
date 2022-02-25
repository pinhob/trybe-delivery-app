const { product: Product } = require('../database/models');

const { errorObject } = require('../utils/errorObject');
const ERROR = require('../utils/messagesError');

const getAll = async () => {
  const result = await Product.findAll();
  return result;
};

const getById = async (id) => {
  const result = await Product.findByPk(id);
  if (!result) throw (errorObject(ERROR.MESSAGE_PROD_NOT_EXISTS, ERROR.STATUS_NOT_FOUND));
  return result;
};

module.exports = {
  getAll,
  getById,
};
