const sinon = require('sinon');
const { expect } = require('chai');

const { user: User } = require('../../database/models/');
const userService = require('../../services/user');
const authService = require('../../services/authService');

const userPayload1 = {
  id: 1,
  name: 'Usuario Cadastrado Unit Test Service User',
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

const userReturnPayload1 = {
  id: 1,
  name: 'Usuario Cadastrado Unit Test Service User',
  email: 'usuario_1@gmail.com',
  role: 'customer',
};

const userReturnPayload2 = {
  id: 2,
  name: 'Vendedor Cadastrado',
  email: 'vendedor@gmail.com',
  role: 'seller',
};

const userReturnPayload3 = {
  id: 3,
  name: 'Administrador Cadastrado',
  email: 'administrador@gmail.com',
  role: 'administrator',
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

const tokenPayload = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFsZWlsdG9uIENoYXZlbmNvIiwiZW1haWwiOiJhbGVpbHRvbkBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NDU3MTkyOTQsImV4cCI6MTY0NTc1MTg5NH0.wRF4FLSxwHSDAr2gJ2p1OmmNQCvdQJP2-oOoBvpyRCY';

describe('Testing Users Services', () => {
  describe('create User', () => {
    describe('when we do not send all field', () => {
      it('return: "name" is required', async () => {
        try {
          await userService.create({
            email: userPayload1.email,
            password: userPayload1.password,
            role: userPayload1.role,
          });
        } catch (error) {
          expect(error.status).to.be.equal(400);
          expect(error.message).to.be.equal('"name" is required');
        }
      });
      it('return: "name" is not allowed to be empty', async () => {
        try {
          await userService.create({
            name: '',
            email: userPayload1.email,
            password: userPayload1.password,
            role: userPayload1.role,
          });
        } catch (error) {
          expect(error.status).to.be.equal(400);
          expect(error.message).to.be.equal('"name" is not allowed to be empty');
        }
      });
      it('return: "name" length must be at least 12 characters long', async () => {
        try {
          await userService.create({
            name: '12345678901',
            email: userPayload1.email,
            password: userPayload1.password,
            role: userPayload1.role,
          });
        } catch (error) {
          expect(error.status).to.be.equal(400);
          expect(error.message).to.be.equal('"name" length must be at least 12 characters long');
        }
      });
      it('return: "email" is required', async () => {
        try {
          await userService.create({
            name: userPayload1.name,
            password: userPayload1.password,
            role: userPayload1.role,
          });
          } catch (error) {
            expect(error.status).to.be.equal(400);
            expect(error.message).to.be.equal('"email" is required');
          }
      });
      it('return: "email" must be a valid email', async () => {
        try {
          await userService.create({
            name: userPayload1.name,
            email: 'emailerrado@email',
            password: userPayload1.password,
            role: userPayload1.role,
          });
          } catch (error) {
            expect(error.status).to.be.equal(400);
            expect(error.message).to.be.equal('"email" must be a valid email');
          }
      });
      it('return: "password" is required', async () => {
        try {
          await userService.create({
            name: userPayload1.name,
            email: userPayload1.email,
            role: userPayload1.role,
          });
        } catch (error) {
          expect(error.status).to.be.equal(400);
          expect(error.message).to.be.equal('"password" is required');
        }
      });
      it('return: "password" length must be at least 6 characters long', async () => {
        try {
          await userService.create({
            name: userPayload1.name,
            email: userPayload1.email,
            password: '12345',
            role: userPayload1.role,
          });
        } catch (error) {
          expect(error.status).to.be.equal(400);
          expect(error.message).to.be.equal('"password" length must be at least 6 characters long');
        }
      });
      it('return: "role" is not allowed to be empty', async () => {
        try {
          await userService.create({
            name: userPayload1.name,
            email: userPayload1.email,
            password: userPayload1.password,
            role: '',
          });
        } catch (error) {
          expect(error.status).to.be.equal(400);
          expect(error.message).to.be.equal('"role" is not allowed to be empty');
        }
      });
    });
    
    describe('Register new user, role !== customer', () => {
      before(() => {
        sinon.stub(User, 'findOne')
        .resolves(null);
      });
      
      after(() => {
        User.findOne.restore();
      });
      
      it('return: User is not administrator', async () => {
        try {
          await userService.create({
            name: userPayload2.name,
            email: userPayload2.email,
            password: userPayload2.password,
            role: userPayload2.role,
            loggedUser: null,
          });
        } catch (error) {
          expect(error.status).to.be.equal(409);
          expect(error.message).to.be.equal('User is not administrator');
        }
      });
    });

    describe('does not allow registering existing username ', () => {
      before(() => {
        sinon.stub(User, 'findOne')
          .resolves(userPayload1);
      });
      
      after(() => {
        User.findOne.restore();
      });
      
      it('return: Name or email already registered', async () => {
        try {
          await userService.create({
            name: userPayload1.name,
            email: userPayload1.email,
            password: userPayload1.password,
            role: userPayload1.role,
          });
        } catch (error) {
          expect(error.status).to.be.equal(409);
          expect(error.message).to.be.equal('Name or email already registered');
        }
      });
    });

    describe('when we send all fields', () => {
      before(() => {
        sinon.stub(User, 'create')
          .resolves({ id: 1 });
      });

      after(() => {
        User.create.restore();
      });

      it('returns an object with name, email, role and token fields', async () => {
        const response = await userService.create({
          name: userPayload1.name,
          email: userPayload1.email,
          password: userPayload1.password,
          role: userPayload1.role,
          loggedUser: null,
        });
        expect(response).to.be.a('object');
        expect(response).to.have.a.property('name');
        expect(response).to.have.a.property('email');
        expect(response).to.have.a.property('role');
        expect(response).to.have.a.property('token');
      });
    });


  });

  describe('getAll User', () => {
    describe('User not exists', () => {
      before(() => {
        sinon.stub(User, 'findAll').resolves([]);
      });
      after(() => {
        User.findAll.restore();
      });

      it('return empty array', async () => {
        const result = await userService.getAll();
        expect(result).to.be.a('array');
        expect(result).to.be.empty;
      });
    });

    describe('User exists', () => {
      before(() => {
        sinon.stub(User, 'findAll').resolves([userPayload1, userPayload2, userPayload3]);
      });
      after(() => {
        User.findAll.restore();
      });

      it('returns array of users', async () => {
        const result = await userService.getAll();
        expect(result).to.be.a('array');
        expect(result).to.deep.equal([userPayload1, userPayload2, userPayload3]);
      });
    });
  });

  describe('getByName User', () => {
    describe('User not exists', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
      });
      after(() => {
        User.findOne.restore();
      });

      it('return: empty array', async () => {
        try {
          await userService.getByName('User not exists');
        } catch (error) {
          expect(error.status).to.be.equal(404);
          expect(error.message).to.be.equal('User does not exist');
        }
      });
    });

    describe('User exists', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(userPayload1);
      });
      after(() => {
        User.findOne.restore();
      });

      it('return user', async () => {
        const result = await userService.getByName(userPayload1.name);
        expect(result).to.be.not.null;
        expect(result).to.deep.equal(userPayload1);
      });
    });
  });

  describe('getById User', () => {
    describe('User not exists', () => {
      before(() => {
        sinon.stub(User, 'findByPk').resolves(null);
      });
      after(() => {
        User.findByPk.restore();
      });

      it('return: User does not exist', async () => {
        try {
          await userService.getById(9, loggedUserPayload3);
        } catch (error) {
          expect(error.status).to.be.equal(404);
          expect(error.message).to.be.equal('User does not exist');
        }
      });
    });

    describe('User exists', () => {
      before(() => {
        sinon.stub(User, 'findByPk').resolves(userPayload1);
      });
      after(() => {
        User.findByPk.restore();
      });

      it('return user', async () => {
        const result = await userService.getById(userPayload1.id, loggedUserPayload1);
        expect(result).to.be.not.null;
        expect(result).to.deep.equal(userPayload1);
      });
    });
    
    describe('search made by a different user ', () => {
      it('return: Invalid entries. Try again.', async () => {
        try {
        await userService.getById(5, loggedUserPayload1);
        } catch (error) {
          expect(error.status).to.be.equal(403);
          expect(error.message).to.be.equal('Invalid entries. Try again.');
        }
      });
    });
  });

  describe('getSellers User', () => {
    describe('Seller not exists', () => {
      before(() => {
        sinon.stub(User, 'findAll').resolves([]);
      });
      after(() => {
        User.findAll.restore();
      });

      it('return: User does not exist', async () => {
        const result = await userService.getSellers();
        expect(result).to.be.a('array');
        expect(result).to.be.empty;
      });
    });

    describe('User exists', () => {
      before(() => {
        sinon.stub(User, 'findAll').resolves(userPayload2);
      });
      after(() => {
        User.findAll.restore();
      });

      it('return user', async () => {
        const result = await userService.getSellers();
        expect(result).to.be.not.null;
        expect(result).to.deep.equal(userPayload2);
      });
    });
  });

  describe('exclude User', () => {
    describe('Seller not exists', () => {
      before(() => {
        sinon.stub(User, 'findByPk').resolves(null);
      });
      after(() => {
        User.findByPk.restore();
      });

      it('return: User does not exist', async () => {
        try {
          await userService.exclude(9, loggedUserPayload2);
        } catch (error) {
          expect(error.status).to.be.equal(404);
          expect(error.message).to.be.equal('User does not exist');
        }
      });
    });

    describe('user != logger != administrator', () => {
      before(() => {
        sinon.stub(User, 'findByPk').resolves(userPayload1);
      });
      after(() => {
        User.findByPk.restore();
      });

      it('return: Invalid entries. Try again.', async () => {
        try {
          await userService.exclude(1, loggedUserPayload2);
        } catch (error) {
          expect(error.status).to.be.equal(403);
          expect(error.message).to.be.equal('Invalid entries. Try again.');
        }
      });
    });

    describe('User exists', () => {
      before(() => {
        sinon.stub(User, 'findByPk').resolves(userPayload2);
        sinon.stub(User, 'destroy').resolves(userPayload2);
      });
      after(() => {
        User.findByPk.restore();
        User.destroy.restore();
      });

      it('return user', async () => {
        const result = await userService.exclude(userPayload2.id, loggedUserPayload2);
        expect(result).to.be.not.null;
        expect(result).to.deep.equal(userPayload2);
      });
    });

    describe('Administrator exclude', () => {
      before(() => {
        sinon.stub(User, 'findByPk').resolves(userPayload2);
        sinon.stub(User, 'destroy').resolves(userPayload2);
      });
      after(() => {
        User.findByPk.restore();
        User.destroy.restore();
      });

      it('return user', async () => {
        const result = await userService.exclude(2, loggedUserPayload3);
        expect(result).to.be.not.null;
        expect(result).to.deep.equal(userPayload2);
      });
    });
  });
});
