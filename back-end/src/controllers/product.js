const ProductServices = require('../services/product');

const getAll = async (_req, res, next) => {
  try {
    const result = await ProductServices.getAll();
    return res.status(200).json(result);
  } catch (error) {
    console.log(`ERROR: GET getAllProducts => ${error.message}`);
    return next(error);
  }
};

module.exports = {
  getAll,
};
