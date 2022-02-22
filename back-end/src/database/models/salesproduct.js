module.exports = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define('SalesProduct',
    {
      quantity: DataTypes.INTEGER,
    }, { timestamps: false });

    salesProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: salesProduct,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: salesProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
  };

  return salesProduct;
};
