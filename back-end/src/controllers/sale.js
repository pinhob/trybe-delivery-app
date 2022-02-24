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

module.exports = {
  create,
};
