const { expect } = require('chai');
const chai = require('chai')
chai.use(require('sinon-chai'))

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const UserModel = require('../../database/models/user');
const SaleModel = require('../../database/models/sale');

describe('User models', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  checkModelName(User)('user');

  context('properties', () => {
    ['name', 'email', 'password', 'role'].forEach(checkPropertyExists(user));
  });

  context('associations', () => {
    const Sale = 1;

    before(() => {
      User.hasMany(SaleModel, { as: 'user', foreignKey: 'userId' });
      User.hasMany(SaleModel, { as: 'sale', foreignKey: 'sellerId' });
    });

    it('defined a hasMany association with User as "sale"', () => {
      expect(User.hasMany).to.have.been.calledWith(SaleModel, {
        as: 'user',
        foreignKey: 'userId',
      });
      expect(User.hasMany).to.have.been.calledWith(SaleModel, {
        as: 'sale',
        foreignKey: 'sellerId',
      });
    });
  });

});
