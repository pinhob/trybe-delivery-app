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

const userPayload1 = {
  id: 1,
  name: 'Usuario Cadastrado Test integration Products',
  email: 'usuario_tip@gmail.com',
  password: '123456',
  role: 'customer',
};

const productsPayload = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: 2.20,
    url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: 7.50,
    url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: 2.49,
    url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
  },
  {
    id: 4,
    name: 'Brahma 600ml',
    price: 7.50,
    url_image: 'http://localhost:3001/images/brahma_600ml.jpg',
  },
  {
    id: 5,
    name: 'Skol 269ml',
    price: 2.19,
    url_image: 'http://localhost:3001/images/skol_269ml.jpg',
  },
];

describe('Route PRODUCTS', () => {
  let tokenValid;
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
  
  describe('GET All', () => {
    describe('Products not exists', () => {

      before(() => {
        sinon.stub(Product, 'findAll').resolves([]);
      });

      after(() => {
        Product.findAll.restore();
      });

      it('status is 200', async () => {
        const result = await chai.request(app).get('/products').set({ authorization: tokenValid });
        expect(result.status).to.be.equals(200);
      });
  
      it('response is a array', async () => {
        const result = await chai.request(app).get('/products').set({ authorization: tokenValid });
        expect(result.body).to.be.an('array');
      });
  
      it('array is empty', async () => {
        const result = await chai.request(app).get('/products').set({ authorization: tokenValid });
        expect(result.body).to.be.empty;
      });
    });

    describe('Products exists', () => {
      before(() => {
        sinon.stub(Product, 'findAll').resolves(productsPayload);
      });

      after(() => {
        Product.findAll.restore();
      });

      it('status is 200', async () => {
        const result = await chai.request(app).get('/products').set({ authorization: tokenValid });
        expect(result.status).to.be.equals(200);
      });
  
      it('response is a array', async () => {
        const result = await chai.request(app).get('/products').set({ authorization: tokenValid });
        expect(result.body).to.be.an('array');
      });
  
      it('array is not empty', async () => {
        const result = await chai.request(app).get('/products').set({ authorization: tokenValid });
        expect(result.body).to.be.not.empty;
      });

      it('return array of object', async () => {
        const result = await chai.request(app).get('/products').set({ authorization: tokenValid });
        expect(result.body[0]).to.be.have.a.property('id');
        expect(result.body[0]).to.be.have.a.property('name');
        expect(result.body[0]).to.be.have.a.property('price');
        expect(result.body[0]).to.be.have.a.property('url_image');
      });
    });

  });

  describe('GET by Id', () => {
    describe('Product not exists', () => {

      before(() => {
        sinon.stub(Product, 'findByPk').resolves(null);
      });

      after(() => {
        Product.findByPk.restore();
      });

      it('status is 404', async () => {
        const result = await chai.request(app).get('/products/99').set({ authorization: tokenValid });
        expect(result.status).to.be.equals(404);
      });
  
      it('message: Product does not exist', async () => {
        const result = await chai.request(app).get('/products/99').set({ authorization: tokenValid });
        expect(result.body.message).to.be.equal('Product does not exist');
      });
    });

    describe('User exists', () => {
      before(async () => {
        sinon.stub(Product, 'findByPk').resolves(productsPayload[0]);
      });

      after(async () => {
        try {
          Product.findByPk.restore();
        } catch (error) {
          console.error(error.message);
        }
      });

      it('status is 200', async () => {
        const result = await chai.request(app).get('/products/1').set({ authorization: tokenValid });
        expect(result.status).to.be.equals(200);
      });
  
      it('response is a object', async () => {
        const result = await chai.request(app).get('/products/1').set({ authorization: tokenValid });
        expect(result.body).to.be.an('object');
      });
  
      it('object is not empty', async () => {
        const result = await chai.request(app).get('/products/1').set({ authorization: tokenValid });
        expect(result.body).to.be.not.empty;
      });

      it('return object is not password field', async () => {
        const result = await chai.request(app).get('/products/1').set({ authorization: tokenValid });
        expect(result.body).to.be.have.a.property('id');
        expect(result.body).to.be.have.a.property('name');
        expect(result.body).to.be.have.a.property('price');
        expect(result.body).to.be.have.a.property('url_image');
      });
    });
  });

});
