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
  name: 'Usuario Cadastrado Test Integration Sale Delete',
  email: 'usuario_tisd@gmail.com',
  password: '123456',
  role: 'administrator',
};

const userPayload2 = {
  name: 'Usuario Cadastrado Test Integration Sale Delete2',
  email: 'usuario_tisd2@gmail.com',
  password: '123456',
  role: 'customer',
};

const salesReturnPayload1 = [
  {
    id: 1,
    userId: 99,
    sellerId: 2,
    totalPrice: '13.77',
    deliveryAddress: 'Rua da Trybe',
    deliveryNumber: '123',
    saleDate: '2022-03-02T21:22:23.000Z',
    status: 'Pendente',
    user: {
        id: 1,
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
  describe('DELETE by Id', () => {
    let tokenValidById;
    before(async () => {
      try {
        await User.create(userPayload1);
        const { body: { token } } = await chai.request(app)
          .post('/login')
          .send({
            name: userPayload1.name,
            password: userPayload1.password,
          });
          // tokenValid será usado para as requisições futuras
          tokenValidById = token;
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

    describe('Sale not exists', () => {
      let resultDelete;
      before(async () => {
        sinon.stub(Sale, 'findByPk').resolves(null);
        resultDelete = await chai.request(app).delete('/sales/99').set({ authorization: tokenValidById });
      });
      after(() => {
        Sale.findByPk.restore();
      });
      
      it('status is 404', async () => {
        expect(resultDelete.status).to.be.equals(404);
      });
      
      it('message: Sale does not exist', async () => {
        expect(resultDelete.body.message).to.be.equal('Sale does not exist');
      });
    });
    
    describe('User not crated sale', () => {
      let resultDelete;
      let tokenValidById2;
      before(async () => {
        await User.create(userPayload2);
        const { body: { token } } = await chai.request(app)
          .post('/login')
          .send({
            name: userPayload2.name,
            password: userPayload2.password,
          });
          // tokenValid será usado para as requisições futuras
        tokenValidById2 = token;
        sinon.stub(Sale, 'findByPk').resolves(salesReturnPayload1[0]);
        sinon.stub(Sale, 'destroy').resolves(true);
        resultDelete = await chai.request(app).delete('/sales/1').set({ authorization: tokenValidById2 });
      });
      after(async () => {
        Sale.findByPk.restore();
        Sale.destroy.restore();
        await User.destroy({ where: { name: userPayload2.name } });
      });
      it('status is 401', async () => {
        expect(resultDelete.status).to.be.equals(401);
      });
      
      it('message: Unauthorized user', async () => {
        expect(resultDelete.body.message).to.be.equal('Unauthorized user');
      });
    });

    describe('Sale exists', () => {
      let resultDelete;
      before(async () => {
        sinon.stub(Sale, 'findByPk').resolves(salesReturnPayload1[0]);
        sinon.stub(Sale, 'destroy').resolves(true);
        resultDelete = await chai.request(app).delete('/sales/1').set({ authorization: tokenValidById });
      });
      after(() => {
        Sale.findByPk.restore();
        Sale.destroy.restore();
      });
      it('status is 204 and body empty', async () => {
        expect(resultDelete.status).to.be.equals(204);
        expect(resultDelete.body).to.be.empty;
      });
    });
  });

});
