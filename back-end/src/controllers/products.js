const ProductServices = require('../services/product');

const getAll = async (_req, res, next) => {
  try {
    const products = await ProductServices.getAll();
    return res.status(200).json(products);
  } catch (error) {
    console.log(`ERROR: GET getAllProduct=> ${error.message}`);
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    const product = await ProductServices.getById(id);
    return res.status(200).json(product);
  } catch (error) {
    console.log(`ERROR: GET getProductById => ${error.message}`);
    return next(error);
  }
};

module.exports = {
  getAll,
  getById,
};
