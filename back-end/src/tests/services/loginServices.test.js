const sinon = require('sinon');
const { expect } = require('chai');

const { user: User } = require('../../database/models/');
const loginService = require('../../services/login');

const userPayload1 = {
  id: 1,
  name: 'Usuario Cadastrado Unit Test Service Login',
  email: 'usuario_login@gmail.com',
  password: '123456',
  role: 'customer',
};

describe('Testing Login Services', () => {
  describe('when we do not send all field', () => {
    it('return: Invalid fields - when the password is not sent', async () => {
      try {
        await loginService.login({
          name: userPayload1.name,
        });
      } catch (error) {
        expect(error.status).to.be.equal(400);
        expect(error.message).to.be.equal('Invalid fields');
      }
    });
    
    it('return: Invalid fields - when the password is empty', async () => {
      try {
        await loginService.login({
          name: userPayload1.name,
          password: '',
        });
      } catch (error) {
        expect(error.status).to.be.equal(400);
        expect(error.message).to.be.equal('Invalid fields');
      }
    });
    
    it('return: Invalid fields - when the password is incorrect', async () => {
      try {
        await loginService.login({
          name: userPayload1.name,
          password: 'xablau',
        });
      } catch (error) {
        expect(error.status).to.be.equal(400);
        expect(error.message).to.be.equal('Invalid fields');
      }
    });
    
    it('return: Invalid fields - when the name is not sent', async () => {
      try {
        await loginService.login({
          password: userPayload1.password,
        });
      } catch (error) {
        expect(error.status).to.be.equal(400);
        expect(error.message).to.be.equal('Invalid fields');
      }
    });
    
    it('return: Invalid fields - when the name is empty', async () => {
      try {
        await loginService.login({
          name: '',
          password: userPayload1.password,
        });
      } catch (error) {
        expect(error.status).to.be.equal(400);
        expect(error.message).to.be.equal('Invalid fields');
      }
    });
    
    it('return: Invalid fields - when the name not exists', async () => {
      try {
        await loginService.login({
          name: 'Xablau Filho',
          password: userPayload1.password,
        });
      } catch (error) {
        expect(error.status).to.be.equal(400);
        expect(error.message).to.be.equal('Invalid fields');
      }
    });
    
  });

  describe('when we do send all field', () => {
    before(() => {
      sinon.stub(User, 'findOne')
        .resolves(userPayload1);
    });
    
    after(() => {
      User.findOne.restore();
    });

    it('returns an object with name, email, role and token fields', async () => {
      const result = await loginService.login(userPayload1.name, userPayload1.password);
      expect(result).to.be.a('object');
      expect(result).to.have.a.property('name');
      expect(result).to.have.a.property('email');
      expect(result).to.have.a.property('role');
      expect(result).to.have.a.property('token');
      expect(result).to.have.not.a.property('password');
    });
    
  });
});
