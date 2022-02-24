module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('Sale', {
    userId: { type: DataTypes.INTEGER, foreignKey: true, field: 'user_id' },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true, field: 'seller_id' },
    totalPrice: { type: DataTypes.DECIMAL, field: 'total_price' },
    deliveryAddress: { type: DataTypes.STRING, field: 'delivery_address' },
    deliveryNumber: { type: DataTypes.STRING, field: 'delivery_number' },
    saleDate: { type: DataTypes.DATE, field: 'sale_date' },
    status: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  sale.associate = (models) => {
    sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user'});
    sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller'});
  };

  return sale;
};
