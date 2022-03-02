const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const { user: User } = require('../../database/models');

const app = require('../../api/app');

// omitir os `console.log`s dos testes gerando um `stub` pra função
const consoleLogStub = stub(console, 'log');
before(()=> consoleLogStub.returns(true));
after(()=> consoleLogStub.restore());

const userPayload1 = {
  name: 'Usuario Cadastrado integration',
  email: 'usuario_integration@gmail.com',
  password: '123456',
  role: 'customer',
};

describe('Route USERS', () => {
  describe('POST', () => {
    describe('when "body" data is valid', () => {
      let postUser;

      before(async () => {
        try {
          postUser = await chai.request(app)
            .post('/users')
            .send({
              name: userPayload1.name,
              email: userPayload1.email,
              password: userPayload1.password,
              role: userPayload1.role,
            });
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

      it('return 201 - Created', async () => {
        const { status } = postUser;

        expect(status).to.be.equals(201);
      });

      it('returns a "name" attribute, which is a string', async () => {
        const { body: { name } } = postUser;
        expect(typeof name).to.be.equals('string');
      });

      it('returns a "email" attribute, which is a string', async () => {
        const { body: { email } } = postUser;
        expect(typeof email).to.be.equals('string');
      });

      it('returns a "role" attribute, which is a string', async () => {
        const { body: { role } } = postUser;
        expect(typeof role).to.be.equals('string');
      });

      it('returns a "token" attribute, which is a string', async () => {
        const { body: { token } } = postUser;
        expect(typeof token).to.be.equals('string');
      });
    });

    describe('when "body" data is not valid', () => {
      let postUser;

      it('return: "name" is required', async () => {
          postUser = await chai.request(app)
          .post('/users')
          .send({
            // name: userPayload1.name,
            email: userPayload1.email,
            password: userPayload1.password,
            role: userPayload1.role,
          });
          const { status, body: { message } } = postUser;
          expect(status).to.be.equals(400);
          expect(message).to.be.equals('"name" is required');
      });

      it('return: "name" is not allowed to be empty', async () => {
          postUser = await chai.request(app)
          .post('/users')
          .send({
            name: '',
            email: userPayload1.email,
            password: userPayload1.password,
            role: userPayload1.role,
          });
          const { status, body: { message } } = postUser;
          expect(status).to.be.equals(400);
          expect(message).to.be.equals('"name" is not allowed to be empty');
      });

      it('return: "name" length must be at least 12 characters long', async () => {
          postUser = await chai.request(app)
          .post('/users')
          .send({
            name: '12345678901',
            email: userPayload1.email,
            password: userPayload1.password,
            role: userPayload1.role,
          });
          const { status, body: { message } } = postUser;
          expect(status).to.be.equals(400);
          expect(message).to.be.equals('"name" length must be at least 12 characters long');
      });
      
      it('return: "email" is required', async () => {
          postUser = await chai.request(app)
          .post('/users')
          .send({
            name: userPayload1.name,
            // email: userPayload1.email,
            password: userPayload1.password,
            role: userPayload1.role,
          });
          const { status, body: { message } } = postUser;
          expect(status).to.be.equals(400);
          expect(message).to.be.equals('"email" is required');
      });

      it('return: "email" is not allowed to be empty', async () => {
          postUser = await chai.request(app)
          .post('/users')
          .send({
            name: userPayload1.name,
            email: '',
            password: userPayload1.password,
            role: userPayload1.role,
          });
          const { status, body: { message } } = postUser;
          expect(status).to.be.equals(400);
          expect(message).to.be.equals('"email" is not allowed to be empty');
      });

      it('return: "email" must be a valid email', async () => {
          postUser = await chai.request(app)
          .post('/users')
          .send({
            name: userPayload1.name,
            email: 'emailerrado@email',
            password: userPayload1.password,
            role: userPayload1.role,
          });
          const { status, body: { message } } = postUser;
          expect(status).to.be.equals(400);
          expect(message).to.be.equals('"email" must be a valid email');
      });

      it('return: "password" is required', async () => {
          postUser = await chai.request(app)
          .post('/users')
          .send({
            name: userPayload1.name,
            email: userPayload1.email,
            // password: userPayload1.password,
            role: userPayload1.role,
          });
          const { status, body: { message } } = postUser;
          expect(status).to.be.equals(400);
          expect(message).to.be.equals('"password" is required');
      });

      it('return: "password" is not allowed to be empty', async () => {
          postUser = await chai.request(app)
          .post('/users')
          .send({
            name: userPayload1.name,
            email: userPayload1.email,
            password: '',
            role: userPayload1.role,
          });
          const { status, body: { message } } = postUser;
          expect(status).to.be.equals(400);
          expect(message).to.be.equals('"password" is not allowed to be empty');
      });

      it('return: "password" length must be at least 6 characters long', async () => {
          postUser = await chai.request(app)
          .post('/users')
          .send({
            name: userPayload1.name,
            email: userPayload1.email,
            password: '12345',
            role: userPayload1.role,
          });
          const { status, body: { message } } = postUser;
          expect(status).to.be.equals(400);
          expect(message).to.be.equals('"password" length must be at least 6 characters long');
      });

      it('return: "role" is not allowed to be empty', async () => {
          postUser = await chai.request(app)
          .post('/users')
          .send({
            name: userPayload1.name,
            email: userPayload1.email,
            password: userPayload1.password,
            role: '',
          });
          const { status, body: { message } } = postUser;
          expect(status).to.be.equals(400);
          expect(message).to.be.equals('"role" is not allowed to be empty');
      });

      it('return: User is not administrator', async () => {
          postUser = await chai.request(app)
          .post('/users')
          .send({
            name: userPayload1.name,
            email: userPayload1.email,
            password: userPayload1.password,
            role: 'administrator',
          });
          const { status, body: { message } } = postUser;
          expect(status).to.be.equals(409);
          expect(message).to.be.equals('User is not administrator');
      });

      it('return: Name or email already registered', async () => {
          await chai.request(app)
          .post('/users')
          .send({
            name: userPayload1.name,
            email: userPayload1.email,
            password: userPayload1.password,
            role: userPayload1.role,
          });
          postUser = await chai.request(app)
          .post('/users')
          .send({
            name: userPayload1.name,
            email: userPayload1.email,
            password: userPayload1.password,
            role: userPayload1.role,
          });
          const { status, body: { message } } = postUser;
          expect(status).to.be.equals(409);
          expect(message).to.be.equals('Name or email already registered');
          await User.destroy({ where: { name: userPayload1.name } });
      });
    });
  });
});
