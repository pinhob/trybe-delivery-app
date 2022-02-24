module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: { type: DataTypes.STRING, field: 'url_image' },
  }, {
    timestamps: false,
  });

  product.associate = (models) => {
    product.hasMany(models.SalesProduct, { foreignKey: 'productId', as: 'product' });
  };

  return product;
};
