const sinon = require('sinon');
const { expect } = require('chai');

const userService = require('../../services/user');
const userController = require('../../controllers/user');

const { errorObject } = require('../../utils/errorObject');
const ERROR = require('../../utils/messagesError');

const userPayload1 = {
  id: 1,
  name: 'Usuario Cadastrado 1',
  email: 'usuario_1@gmail.com',
  password: '123456',
  role: 'customer',
};

const userPayload2 = {
  id: 2,
  name: 'Vendedor Cadastrado',
  email: 'vendedor@gmail.com',
  password: '123456',
  role: 'seller',
};

const userPayload3 = {
  id: 3,
  name: 'Administrador Cadastrado',
  email: 'administrador@gmail.com',
  password: '123456',
  role: 'administrator',
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFsZWlsdG9uIENoYXZlbmNvIiwiZW1haWwiOiJhbGVpbHRvbkBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NDU3MTkyOTQsImV4cCI6MTY0NTc1MTg5NH0.wRF4FLSxwHSDAr2gJ2p1OmmNQCvdQJP2-oOoBvpyRCY';

const userReturnPayload1 = {
  name: userPayload1.name,
  email: userPayload1.email,
  role: userPayload1.role,
  token
};

const userReturnPayload2 = {
  name: userPayload2.name,
  email: userPayload2.email,
  role: userPayload2.role,
  token
};

const userReturnPayload3 = {
  name: userPayload3.name,
  email: userPayload3.email,
  role: userPayload3.role,
  token
};

const loggedUserPayload1 = {
  id: userPayload1.id,
  name: userPayload1.name,
  email: userPayload1.email,
  role: userPayload1.role,
};

const loggedUserPayload2 = {
  id: userPayload2.id,
  name: userPayload2.name,
  email: userPayload2.email,
  role: userPayload2.role,
};

const loggedUserPayload3 = {
  id: userPayload3.id,
  name: userPayload3.name,
  email: userPayload3.email,
  role: userPayload3.role,
};

describe('Testing Users Controllers', () => {
  describe('create User', () => {
    describe('when the informed payload is valid', () => {
      const res = {};
      const req = {};

      before(() => {
        req.body = {
          name: userPayload1.name,
          email: userPayload1.email,
          password: userPayload1.password,
          role: userPayload1.role,
        };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(userService, 'create').resolves(userReturnPayload1);
      });

      after(() => {
        userService.create.restore();
      });

      it('status is called with code 201', async () => {
        await userController.create(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });
    });
  });

  describe('getAll User', () => {
    const req = {};
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(userService, 'getAll').resolves([userReturnPayload1, userReturnPayload2]);
    });

    after(() => {
      userService.getAll.restore();
    });

    it('status is called with code 200', async () => {
      await userController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('getById User', () => {
    const req = {};
    const res = {};

    before(() => {
      req.params = 1;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(userService, 'getById').resolves(userReturnPayload1);
    });

    after(() => {
      userService.getById.restore();
    });

    it('status is called with code 200', async () => {
      await userController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
  
  describe('getSellers User', () => {
    const req = {};
    const res = {};
    
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(userService, 'getSellers').resolves([userReturnPayload2]);
    });
    
    after(() => {
      userService.getSellers.restore();
    });
    
    it('status is called with code 200', async () => {
      await userController.getSellers(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('exclude User', () => {
    const req = {};
    const res = {};
  
    before(() => {
      req.params = 1;
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon.stub(userService, 'exclude').resolves(true);
    });
  
    after(() => {
      userService.exclude.restore();
    });
  
    it('status is called with code 200', async () => {
      await userController.exclude(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});
