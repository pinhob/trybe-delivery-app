module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  user.associate = (models) => {
    user.hasMany(models.Sale, { foreignKey: 'userId', as: 'user' });
    user.hasMany(models.Sale, { foreignKey: 'sellerId', as: 'sale' });
  };

  return user;
};
