module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('Sale', {
    user_id: { type: DataTypes.INTEGER, foreignKey: true },
    seller_id: { type: DataTypes.INTEGER, foreignKey: true },
    total_price: DataTypes.DECIMAL,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  sale.associate = (models) => {
    sale.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
    sale.belongsTo(models.User, { foreignKey: 'seller_id', as: 'seller'});
  };

  return sale;
};
