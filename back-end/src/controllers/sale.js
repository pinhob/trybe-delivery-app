const SaleServices = require('../services/sale');

const create = async (req, res, next) => {
  try {
    const { body, loggedUser } = req;
    const { id: userId } = loggedUser;
    const { totalPrice, deliveryAddress, deliveryNumber, status = 'Pendente', products } = body;
    const sale = { userId, totalPrice, deliveryAddress, deliveryNumber, status, products };
    const result = await SaleServices.create(sale);
    return res.status(201).json(result);
  } catch (error) {
    console.log(`ERROR: POST createSale => ${error.message}`);
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const result = await SaleServices.getAll();
    return res.status(201).json(result);
  } catch (error) {
    console.log(`ERROR: POST createSale => ${error.message}`);
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await SaleServices.getById(id);
    return res.status(201).json(result);
  } catch (error) {
    console.log(`ERROR: POST createSale => ${error.message}`);
    return next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
