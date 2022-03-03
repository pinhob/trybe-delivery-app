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

describe('Route USERS', () => {
  let tokenValid;
  let idTest;

  describe('DELETE by Id', () => {
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
        const result = await chai.request(app).delete('/users/99').set({ authorization: tokenValidById });
        expect(result.status).to.be.equals(404);
      });
  
      it('message: Invalid entries. Try again.', async () => {
        const result = await chai.request(app).delete('/users/99').set({ authorization: tokenValidById });
        expect(result.body.message).to.be.equal('User does not exist');
      });
    });

    describe('User exists', () => {
      it('status is 200 and body empty', async () => {
        const result = await chai.request(app).delete(`/users/${idTest}`).set({ authorization: tokenValidById });
        expect(result.status).to.be.equals(200);
        expect(result.body).to.be.empty;
      });
    });
  });

});
