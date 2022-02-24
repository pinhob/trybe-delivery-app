const SaleServices = require('../services/sale');

const create = async (req, res, next) => {
  try {
    const { body, loggedUser } = req;
    const { id: userId } = loggedUser;
    const {
      sellerId, totalPrice, deliveryAddress, deliveryNumber, status = 'Pendente', products } = body;
    const sale = {
      userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products };
    const result = await SaleServices.create(sale);
    return res.status(201).json(result);
  } catch (error) {
    console.log(`ERROR: POST createSale => ${error.message}`);
    return next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { seller = '', status = '', user = '' } = req.query;
    const result = await SaleServices.getAll(seller, status, user);
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

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products } = req.body;
    const result = await SaleServices.update({
      id, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products });
    return res.status(200).json(result);
  } catch (error) {
    console.log(`ERROR: PUT updateSale => ${error.message}`);
    return next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const result = await SaleServices.updateStatus(id, status);
    return res.status(200).json(result);
  } catch (error) {
    console.log(`ERROR: PUT updateStatusSale => ${error.message}`);
    return next(error);
  }
};

const exclude = async (req, res, next) => {
  try {
    const { params, loggedUser } = req;
    const { id: userId, role } = loggedUser;
    const { id } = params;
    await SaleServices.exclude(id, userId, role);
    return res.status(204).send();
  } catch (error) {
    console.log(`ERROR: DELETE excludeSale => ${error.message}`);
    return next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  updateStatus,
  exclude,
};
