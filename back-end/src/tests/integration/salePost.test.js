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
// const consoleLogStub = sinon.stub(console, 'log');
// before(()=> consoleLogStub.returns(true));
// after(()=> consoleLogStub.restore());

const userPayload1 = {
  id: 1,
  name: 'Usuario Cadastrado Test Integration Sale Post',
  email: 'usuario_tisp@gmail.com',
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

const salesReturnPayload1 = {
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
};

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

  describe('POST', () => {
    describe('when "body" data is not valid', () => {
      it('return: "sellerId" is required', async () => {
        const result = await chai.request(app)
        .post('/sales')
        .send({
          // sellerId: 2,
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
        })
        .set({ authorization: tokenValid });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('"sellerId" is required');
      });

      it('return: "sellerId" must be a number', async () => {
        const result = await chai.request(app)
        .post('/sales')
        .send({
          sellerId: '',
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
        })
        .set({ authorization: tokenValid });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('"sellerId" must be a number');
      });

      it('return: "totalPrice" is required', async () => {
        const result = await chai.request(app)
        .post('/sales')
        .send({
          sellerId: 2,
          // totalPrice: 13.77,
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
        })
        .set({ authorization: tokenValid });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('"totalPrice" is required');
      });

      it('return: "totalPrice" must be a number', async () => {
        const result = await chai.request(app)
        .post('/sales')
        .send({
          sellerId: 2,
          totalPrice: '',
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
        })
        .set({ authorization: tokenValid });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('"totalPrice" must be a number');
      });

      it('return: "deliveryAddress" is required', async () => {
        const result = await chai.request(app)
        .post('/sales')
        .send({
          sellerId: 2,
          totalPrice: 13.77,
          // deliveryAddress: 'Rua da Trybe',
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
        })
        .set({ authorization: tokenValid });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('"deliveryAddress" is required');
      });

      it('return:"deliveryAddress" is not allowed to be empty', async () => {
        const result = await chai.request(app)
        .post('/sales')
        .send({
          sellerId: 2,
          totalPrice: 13.77,
          deliveryAddress: '',
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
        })
        .set({ authorization: tokenValid });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('"deliveryAddress" is not allowed to be empty');
      });

      it('return: Product does not quantity', async () => {
        const result = await chai.request(app)
        .post('/sales')
        .send({
          sellerId: 2,
          totalPrice: 13.77,
          deliveryAddress: 'Rua da Trybe',
          deliveryNumber: '123',
          status: 'Pendente',
          products: [
              {
                  productId: 1,
                  quantity: 0
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
        })
        .set({ authorization: tokenValid });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('Product does not quantity');
      });

      it('return: Product does not exist', async () => {
        sinon.stub(Product, 'findByPk').resolves(null);
        const result = await chai.request(app)
        .post('/sales')
        .send({
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
        })
        .set({ authorization: tokenValid });
        expect(result.status).to.be.equals(400);
        expect(result.body.message).to.be.equals('Product does not exist');
        Product.findByPk.restore();
      });

    });

    describe('when "body" data is valid', () => {
      let resultCreateSale;
      before(async () => {
        sinon.stub(Product, 'findByPk').resolves(productsPayload[0]);
        sinon.stub(Sale, 'create').resolves({ id: 1 });
        sinon.stub(SalesProduct, 'create').resolves(true);
        sinon.stub(Sale, 'findByPk').resolves(salesReturnPayload1);
        resultCreateSale = await chai.request(app)
          .post('/sales')
          .send({
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
          })
          .set({ authorization: tokenValid });
      });

      after(() => {
        Product.findByPk.restore();
        Sale.create.restore();
        SalesProduct.create.restore();
        Sale.findByPk.restore();
      });

      it('return 201 - Created', async () => {
        expect(resultCreateSale.status).to.be.equals(201);
      });

      it('returns a object', async () => {
        expect(typeof resultCreateSale).to.be.equals('object');
      });

      it('return a "id" property', async () => {
        expect(resultCreateSale.body).to.be.have.a.property('id');
      });

      it('return a "userId" property', async () => {
        expect(resultCreateSale.body).to.be.have.a.property('userId');
      });

      it('return a "sellerId" property', async () => {
        expect(resultCreateSale.body).to.be.have.a.property('sellerId');
      });

      it('return a "totalPrice" property', async () => {
        expect(resultCreateSale.body).to.be.have.a.property('totalPrice');
      });

      it('return a "deliveryAddress" property', async () => {
        expect(resultCreateSale.body).to.be.have.a.property('deliveryAddress');
      });

      it('return a "deliveryNumber" property', async () => {
        expect(resultCreateSale.body).to.be.have.a.property('deliveryNumber');
      });

      it('return a "status" property', async () => {
        expect(resultCreateSale.body).to.be.have.a.property('status');
      });

      it('return a "user" property', async () => {
        expect(resultCreateSale.body).to.be.have.a.property('user');
      });

      it('return a "seller" property', async () => {
        expect(resultCreateSale.body).to.be.have.a.property('seller');
      });

      it('return a "products" property', async () => {
        expect(resultCreateSale.body).to.be.have.a.property('products');
      });

    });

    
  });
});
