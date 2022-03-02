const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../api/app');
const {
  user: User, sale: Sale, product: Product, salesProduct: SalesProduct,
} = require('../../database/models');

// omitir os `console.log`s dos testes gerando um `stub` pra função
const consoleLogStub = sinon.stub(console, 'log');
before(()=> consoleLogStub.returns(true));
after(()=> consoleLogStub.restore());

const userPayload1 = {
  id: 1,
  name: 'Usuario Cadastrado Test Integration Sale Get',
  email: 'usuario_tisg@gmail.com',
  password: '123456',
  role: 'customer',
};

const salePayload1 = {
  sellerId: 2,
  totalPrice: 13.77,
  deliveryAddress: 'Rua da Trybe',
  deliveryNumber: '123',
  status: 'Pendente',
  products: [
      {
          productId: 1,
          quantity: 3
      },
      {
          productId: 3,
          quantity: 2
      },
      {
          productId: 5,
          quantity: 1
      },
  ],
};

const salesReturnPayload1 = [
  {
    id: 1,
    userId: 4,
    sellerId: 2,
    totalPrice: '13.77',
    deliveryAddress: 'Rua da Trybe',
    deliveryNumber: '123',
    saleDate: '2022-03-02T21:22:23.000Z',
    status: 'Pendente',
    user: {
        id: userPayload1.id,
        name: userPayload1.name,
        email: userPayload1.email,
        role: userPayload1.role
    },
    seller: {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        role: 'seller'
    },
    products: [
        {
            id: 1,
            name: 'Skol Lata 250ml',
            price: '2.20',
            urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
            salesProduct: {
                quantity: 3
            }
        },
        {
            id: 3,
            name: 'Antarctica Pilsen 300ml',
            price: '2.49',
            urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
            salesProduct: {
                quantity: 2
            }
        },
        {
            id: 5,
            name: 'Skol 269ml',
            price: '2.19',
            urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
            salesProduct: {
                quantity: 1
            }
        }
    ]
  }
];

describe('Route SALES', () => {
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
    describe('Sales not exists', () => {
      before(() => {
        sinon.stub(Sale, 'findAll').resolves([]);
      });

      after(() => {
        Sale.findAll.restore();
      });

      it('status is 200', async () => {
        const result = await chai.request(app).get('/sales').set({ authorization: tokenValid });
        expect(result.status).to.be.equals(200);
      });
  
      it('response is a array', async () => {
        const result = await chai.request(app).get('/sales').set({ authorization: tokenValid });
        expect(result.body).to.be.an('array');
      });
  
      it('array is empty', async () => {
        const result = await chai.request(app).get('/sales').set({ authorization: tokenValid });
        expect(result.body).to.be.empty;
      });
    });

    describe('Sales exists', () => {
      let resultSales;
      before(async () => {
        sinon.stub(Sale, 'findAll').resolves(salesReturnPayload1);
        resultSales = await chai.request(app).get('/sales').set({ authorization: tokenValid });
      });

      after(() => {
        Sale.findAll.restore();
      });

      it('return 200', async () => {
        expect(resultSales.status).to.be.equals(200);
      });

      it('return a "id" property in array element', async () => {
        expect(resultSales.body[0]).to.be.have.a.property('id');
      });

      it('return a "userId" property in array element', async () => {
        expect(resultSales.body[0]).to.be.have.a.property('userId');
      });

      it('return a "sellerId" property in array element', async () => {
        expect(resultSales.body[0]).to.be.have.a.property('sellerId');
      });

      it('return a "totalPrice" property in array element', async () => {
        expect(resultSales.body[0]).to.be.have.a.property('totalPrice');
      });

      it('return a "deliveryAddress" property in array element', async () => {
        expect(resultSales.body[0]).to.be.have.a.property('deliveryAddress');
      });

      it('return a "deliveryNumber" property in array element', async () => {
        expect(resultSales.body[0]).to.be.have.a.property('deliveryNumber');
      });

      it('return a "status" property in array element', async () => {
        expect(resultSales.body[0]).to.be.have.a.property('status');
      });

      it('return a "user" property in array element', async () => {
        expect(resultSales.body[0]).to.be.have.a.property('user');
      });

      it('return a "seller" property in array element', async () => {
        expect(resultSales.body[0]).to.be.have.a.property('seller');
      });

      it('return a "products" property in array element', async () => {
        expect(resultSales.body[0]).to.be.have.a.property('products');
      });
    });
  });

  describe('GET by Id', () => {
    let resultSaleById;
    describe('Sales not exists', () => {
      before(async () => {
        sinon.stub(Sale, 'findByPk').resolves(null);
        resultSaleById = await chai.request(app).get('/sales/999').set({ authorization: tokenValid });
      });

      after(() => {
        Sale.findByPk.restore();
      });

      it('status is 404', async () => {
        expect(resultSaleById.status).to.be.equals(404);
      });
  
      it('message: Sale does not exist', async () => {
        expect(resultSaleById.body.message).to.be.equal('Sale does not exist');
      });
    });

    describe('Sales exists', () => {
      before(async () => {
        sinon.stub(Sale, 'findByPk').resolves(salesReturnPayload1[0]);
        resultSaleById = await chai.request(app).get('/sales/1').set({ authorization: tokenValid });
      });

      after(() => {
        Sale.findByPk.restore();
      });

      it('return 200', async () => {
        expect(resultSaleById.status).to.be.equals(200);
      });

      it('return a "id" property', async () => {
        expect(resultSaleById.body).to.be.have.a.property('id');
      });

      it('return a "userId" property', async () => {
        expect(resultSaleById.body).to.be.have.a.property('userId');
      });

      it('return a "sellerId" property', async () => {
        expect(resultSaleById.body).to.be.have.a.property('sellerId');
      });

      it('return a "totalPrice" property', async () => {
        expect(resultSaleById.body).to.be.have.a.property('totalPrice');
      });

      it('return a "deliveryAddress" property', async () => {
        expect(resultSaleById.body).to.be.have.a.property('deliveryAddress');
      });

      it('return a "deliveryNumber" property', async () => {
        expect(resultSaleById.body).to.be.have.a.property('deliveryNumber');
      });

      it('return a "status" property', async () => {
        expect(resultSaleById.body).to.be.have.a.property('status');
      });

      it('return a "user" property', async () => {
        expect(resultSaleById.body).to.be.have.a.property('user');
      });

      it('return a "seller" property', async () => {
        expect(resultSaleById.body).to.be.have.a.property('seller');
      });

      it('return a "products" property', async () => {
        expect(resultSaleById.body).to.be.have.a.property('products');
      });
    });
  });
});
