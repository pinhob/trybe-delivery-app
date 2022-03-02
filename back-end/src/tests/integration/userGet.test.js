const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../api/app');
const { user: User } = require('../../database/models');

// omitir os `console.log`s dos testes gerando um `stub` pra função
// const consoleLogStub = stub(console, 'log');
// before(()=> consoleLogStub.returns(true));
// after(()=> consoleLogStub.restore());

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

const userResultPayload1 = {
  id: 1,
  name: 'Usuario Cadastrado 1',
  email: 'usuario_1@gmail.com',
  role: 'customer',
};

const userResultPayload2 = {
  id: 2,
  name: 'Vendedor Cadastrado',
  email: 'vendedor@gmail.com',
  role: 'seller',
};

const userResultPayload3 = {
  id: 3,
  name: 'Administrador Cadastrado',
  email: 'administrador@gmail.com',
  role: 'administrator',
};

describe('Route USERS', () => {
  let tokenValid;
  let idTest;
  
  describe('GET', () => {
    before(async () => {
      try {
        const { body: { token, name: newName } } = await chai.request(app)
          .post('/users')
          .send({
            name: userPayload1.name,
            email: userPayload1.email,
            password: userPayload1.password,
            role: userPayload1.role,
          });
          // tokenValid será usado para as requisições futuras
          tokenValid = token;
      } catch (error) {
        console.error(error.message);
      }
    });
  
    after(async () => {
      try {
        await User.destroy({ where: { name: userPayload1.name } });
      } catch (error) {
        console.error(error.message);
      }
    });

    describe('User not exists', () => {

      before(() => {
        sinon.stub(User, 'findAll').resolves([]);
      });

      after(() => {
        User.findAll.restore();
      });

      it('status is 200', async () => {
        const result = await chai.request(app).get('/users').set({ authorization: tokenValid });
        expect(result.status).to.be.equals(200);
      });
  
      it('response is a array', async () => {
        const result = await chai.request(app).get('/users').set({ authorization: tokenValid });
        expect(result.body).to.be.an('array');
      });
  
      it('array is empty', async () => {
        const result = await chai.request(app).get('/users').set({ authorization: tokenValid });
        expect(result.body).to.be.empty;
      });
    });

    describe('User exists', () => {
      before(() => {
        sinon.stub(User, 'findAll').resolves([userResultPayload1, userResultPayload2, userResultPayload3]);
      });

      after(() => {
        User.findAll.restore();
      });

      it('status is 200', async () => {
        const result = await chai.request(app).get('/users').set({ authorization: tokenValid });
        expect(result.status).to.be.equals(200);
      });
  
      it('response is a array', async () => {
        const result = await chai.request(app).get('/users').set({ authorization: tokenValid });
        expect(result.body).to.be.an('array');
      });
  
      it('array is not empty', async () => {
        const result = await chai.request(app).get('/users').set({ authorization: tokenValid });
        expect(result.body).to.be.not.empty;
      });

      it('return object is not password field', async () => {
        const result = await chai.request(app).get('/users').set({ authorization: tokenValid });
        expect(result.body[0]).to.be.have.a.property('id');
        expect(result.body[0]).to.be.have.a.property('name');
        expect(result.body[0]).to.be.have.a.property('email');
        expect(result.body[0]).to.be.have.a.property('role');
        expect(result.body[0]).to.be.have.not.a.property('password');
      });
    });

  });

  describe('GET by Id', () => {
    let tokenValidById;
    before(async () => {
      try {
        const { body: { token } } = await chai.request(app)
          .post('/users')
          .send({
            name: userPayload1.name,
            email: userPayload1.email,
            password: userPayload1.password,
            role: userPayload1.role,
          });
          // tokenValid será usado para as requisições futuras
          tokenValidById = token;
          const result = await User.findOne({ where: { name: userPayload1.name   } });
          idTest = result.id;
      } catch (error) {
        console.error(error.message);
      }
    });
  
    after(async () => {
      try {
        await User.destroy({ where: { name: userPayload1.name } });
      } catch (error) {
        console.error(error.message);
      }
    });

    describe('User not exists', () => {

      before(() => {
        sinon.stub(User, 'findByPk').resolves(null);
      });

      after(() => {
        User.findByPk.restore();
      });

      it('status is 403', async () => {
        const result = await chai.request(app).get('/users/99').set({ authorization: tokenValidById });
        expect(result.status).to.be.equals(403);
      });
  
      it('message: Invalid entries. Try again.', async () => {
        const result = await chai.request(app).get('/users/99').set({ authorization: tokenValidById });
        expect(result.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('User exists', () => {
      before(async () => {
        sinon.stub(User, 'findByPk').resolves(userResultPayload1);
      });

      after(async () => {
        try {
          User.findByPk.restore();
        } catch (error) {
          console.error(error.message);
        }
      });

      it('status is 200', async () => {
        const result = await chai.request(app).get(`/users/${idTest}`).set({ authorization: tokenValidById });
        expect(result.status).to.be.equals(200);
      });
  
      it('response is a object', async () => {
        const result = await chai.request(app).get(`/users/${idTest}`).set({ authorization: tokenValidById });
        expect(result.body).to.be.an('object');
      });
  
      it('array is not empty', async () => {
        const result = await chai.request(app).get(`/users/${idTest}`).set({ authorization: tokenValidById });
        expect(result.body).to.be.not.empty;
      });

      it('return object is not password field', async () => {
        const result = await chai.request(app).get(`/users/${idTest}`).set({ authorization: tokenValidById });
        expect(result.body).to.be.have.a.property('id');
        expect(result.body).to.be.have.a.property('name');
        expect(result.body).to.be.have.a.property('email');
        expect(result.body).to.be.have.a.property('role');
        expect(result.body).to.be.have.not.a.property('password');
      });
    });
  });

  describe('GET sellers', () => {
    let tokenValidBySellers;
    before(async () => {
      try {
        const { body: { token } } = await chai.request(app)
          .post('/users')
          .send({
            name: userPayload1.name,
            email: userPayload1.email,
            password: userPayload1.password,
            role: userPayload1.role,
          });
          // tokenValid será usado para as requisições futuras
          tokenValidBySellers = token;
      } catch (error) {
        console.error(error.message);
      }
    });
  
    after(async () => {
      try {
        await User.destroy({ where: { name: userPayload1.name } });
      } catch (error) {
        console.error(error.message);
      }
    });

    describe('Sellers not exists', () => {

      before(() => {
        sinon.stub(User, 'findAll').resolves([]);
      });

      after(() => {
        User.findAll.restore();
      });

      it('status is 200', async () => {
        const result = await chai.request(app).get('/users/sellers').set({ authorization: tokenValidBySellers });
        expect(result.status).to.be.equals(200);
      });
  
      it('response is a array', async () => {
        const result = await chai.request(app).get('/users/sellers').set({ authorization: tokenValidBySellers });
        expect(result.body).to.be.an('array');
      });
  
      it('array is empty', async () => {
        const result = await chai.request(app).get('/users/sellers').set({ authorization: tokenValidBySellers });
        expect(result.body).to.be.empty;
      });
    });

    describe('Sellers exists', () => {
      before(async () => {
        sinon.stub(User, 'findAll').resolves([userResultPayload2, userResultPayload3]);
        await User.create({
          name: userPayload2.name,
          email: userPayload2.email,
          password: userPayload2.password,
          role: userPayload2.role,
        })
      });

      after(async () => {
        try {
          User.findAll.restore();
          await User.destroy({ where: { name: userPayload2.name } });
        } catch (error) {
          console.error(error.message);
        }
      });

      it('status is 200', async () => {
        const result = await chai.request(app).get('/users/sellers').set({ authorization: tokenValidBySellers });
        expect(result.status).to.be.equals(200);
      });
  
      it('response is a array', async () => {
        const result = await chai.request(app).get('/users/sellers').set({ authorization: tokenValidBySellers });
        expect(result.body).to.be.an('array');
      });
  
      it('array is not empty', async () => {
        const result = await chai.request(app).get('/users/sellers').set({ authorization: tokenValidBySellers });
        expect(result.body).to.be.not.empty;
      });

      it('return object is not password field', async () => {
        const result = await chai.request(app).get('/users/sellers').set({ authorization: tokenValidBySellers });
        expect(result.body[0]).to.be.have.a.property('id');
        expect(result.body[0]).to.be.have.a.property('name');
        expect(result.body[0]).to.be.have.a.property('email');
        expect(result.body[0]).to.be.have.a.property('role');
        expect(result.body[0]).to.be.have.not.a.property('password');
      });
    });

  });
});
