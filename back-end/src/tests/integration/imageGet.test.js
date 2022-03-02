const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../api/app');
const { user: User, product: Product } = require('../../database/models');

// omitir os `console.log`s dos testes gerando um `stub` pra função
// const consoleLogStub = sinon.stub(console, 'log');
// before(()=> consoleLogStub.returns(true));
// after(()=> consoleLogStub.restore());

describe('Route IMAGES', () => {
  describe('GET', () => {
    describe('Image not exists', () => {
      it('status is 404', async () => {
        const result = await chai.request(app).get('/images/xablau.jpg');
        expect(result.status).to.be.equals(404);
      });
  
      it('response is a object', async () => {
        const result = await chai.request(app).get('/images/xablau.jpg');
        expect(result.body).to.be.an('object');
      });
    });

    describe('Image exists', () => {
      it('status is 200', async () => {
        const result = await chai.request(app).get('/images/brahma_600ml.jpg');
        expect(result.status).to.be.equals(200);
      });

      it('array is not empty', async () => {
        const result = await chai.request(app).get('/images/brahma_600ml.jpg');
        expect(result.body).to.be.not.empty;
      });
    });
  });
});
