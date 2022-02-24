module.exports = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define('SalesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'sale_id',
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'product_id',
    },
    quantity: DataTypes.INTEGER,
  }, { timestamps: false });

    salesProduct.associate = (models) => {
      models.Product.belongsToMany(models.Sale, {
        as: 'sales',
        through: salesProduct,
        foreignKey: 'productId',
        otherKey: 'saleId',
      });
      models.Sale.belongsToMany(models.Product, {
        as: 'products',
        through: salesProduct,
        foreignKey: 'saleId',
        otherKey: 'productId',
      });
    };

  return salesProduct;
};
