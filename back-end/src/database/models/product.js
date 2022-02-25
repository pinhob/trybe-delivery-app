module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: { type: DataTypes.STRING, field: 'url_image' },
  }, {
    timestamps: false,
  });

  product.associate = (models) => {
    product.hasMany(models.salesProduct, { foreignKey: 'productId', as: 'product' });
  };

  return product;
};
