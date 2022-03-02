const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../api/app');
const { user: User } = require('../../database/models');

const userPayload1 = {
  id: 1,
  name: 'Usuario Cadastrado Login',
  email: 'usuario_login@gmail.com',
  password: '123456',
  role: 'customer',
};

describe('Route LOGIN', () => {
  describe('POST', () => {
    describe('when "body" data is valid', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(userPayload1);
      });
      
      after(() => {
        User.findOne.restore();
      });
      
      it('return: status 200 and object: name, email, role, token', async () => {
        const result = await chai.request(app)
          .post('/login')
          .send({
            name: userPayload1.name,
            password: userPayload1.password,
          });
        
        expect(result.status).to.be.equals(200);
        expect(result.body).to.be.have.a.property('name');
        expect(result.body.name).to.be.equal(userPayload1.name);
        expect(result.body).to.be.have.a.property('email');
        expect(result.body.email).to.be.equal(userPayload1.email);
        expect(result.body).to.be.have.a.property('role');
        expect(result.body.role).to.be.equal(userPayload1.role);
        expect(result.body).to.be.have.a.property('token');
        expect(result.body).to.be.have.not.a.property('password');
      });
    });

    describe('when "body" data is not valid', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
      });
      
      after(() => {
        User.findOne.restore();
      });

      it('return: Invalid fields - when the password is not sent', async () => {
        const result = await chai.request(app)
        .post('/login')
        .send({
          name: userPayload1.name,
        });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('Invalid fields');
      });

      it('return: Invalid fields - when the password is empty', async () => {
        const result = await chai.request(app)
        .post('/login')
        .send({
          name: userPayload1.name,
          password: '',
        });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('Invalid fields');
      });

      it('return: Invalid fields - when the password is incorrect', async () => {
        const result = await chai.request(app)
        .post('/login')
        .send({
          name: userPayload1.name,
          password: 'xablau',
        });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('Invalid fields');
      });

      it('return: Invalid fields - when the name is not sent', async () => {
        const result = await chai.request(app)
        .post('/login')
        .send({
          password: userPayload1.password,
        });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('Invalid fields');
      });

      it('return: Invalid fields - when the name is empty', async () => {
        const result = await chai.request(app)
        .post('/login')
        .send({
          name: '',
          password: userPayload1.password,
        });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('Invalid fields');
      });

      it('return: Invalid fields - when the name not exists', async () => {
        const result = await chai.request(app)
        .post('/login')
        .send({
          name: 'Xablau Filho',
          password: userPayload1.password,
        });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('Invalid fields');
      });
    });
  });
});
