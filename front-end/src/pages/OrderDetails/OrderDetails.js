import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { fetchSaleById, getSellers } from '../../api';
import Nav from '../../components/Nav';
import ItemDetails from '../../components/ItemDetails';

const saleMock = {
  id: 2,
  userId: 4,
  sellerId: 2,
  totalPrice: '13.77',
  deliveryAddress: 'Rua da Trybe',
  deliveryNumber: '123',
  saleDate: '2022-03-08T19:04:40.000Z',
  status: 'Pendente',
  user: {
    id: 4,
    name: 'Zé da Faca Delivery',
    email: 'ze_da_faca@gmail.com',
    role: 'customer',
  },
  seller: {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  },
  products: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      salesProduct: {
        quantity: 3,
      },
    },
    {
      id: 3,
      name: 'Antarctica Pilsen 300ml',
      price: '2.49',
      urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
      salesProduct: {
        quantity: 2,
      },
    },
    {
      id: 5,
      name: 'Skol 269ml',
      price: '2.19',
      urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
      salesProduct: {
        quantity: 1,
      },
    },
  ],
};
const userMock = {
  name: 'Zé da Faca Delivery',
  email: 'ze_da_faca@gmail.com',
  role: 'customer',
  // eslint-disable-next-line max-len
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IlrDqSBkYSBGYWNhIERlbGl2ZXJ5IiwiZW1haWwiOiJ6ZV9kYV9mYWNhQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0NjQyNzc5MywiZXhwIjoxNjQ2NDYwMzkzfQ.1SfOBO6tX8SvvvnP7AEj2_5JOocRwg3qRrRZL_SZL3k',
};

const OrderDetails = () => {
  const history = useHistory();
  // const infoUsuario = JSON.parse(localStorage.user);
  const { id } = useParams();
  const [sale, setSale] = useState();
  const [infoUsuario, setInfoUsuario] = useState(userMock);

  // useEffect(() => {
  //   if (!infoUsuario) {
  //     history.push('/login');
  //   }
  // }, [history, infoUsuario]);

  useEffect(() => {
    setSale(saleMock);
  }, []);

  function renderTotal() {
    return (
      <li className="checkout-item item-row total">
        <div className="checkout-item-column">
          <p>
            { 'Total: R$ ' }
            <span data-testid="customer_checkout__element-order-total-price">
              {(sale.totalPrice).replace('.', ',')}
            </span>
          </p>
        </div>
      </li>
    );
  }

  function renderMain() {
    return (
      <>
        <Nav
          totalCart={ 10 }
          userLogged={ infoUsuario }
          setInfoUsuario={ setInfoUsuario }
        />
        <ul className="products-cards checkout">
          <div className="checkout-title-body">
            <h3 className="checkout-title">Detalhe do Pedido</h3>
          </div>
          <div className="checkout-body">
            <li className="checkout-item header">
              <div className="checkout-item-column column text-center">
                Pedido
                <span data-testid="customer_order_details__element-order-details-label-order-id">
                  {sale.id}
                </span>
              </div>
              <div className="checkout-item-column column text-center">P.vend:  <span data-testid="customer_order_details__element-order-details-label-seller-name">
                  {sale.seller.name}
                </span></div>
              <div className="checkout-item-column column text-center">
                 <span data-testid="customer_order_details__element-order-details-label-order-date">
                  {sale.saleDate}
                </span>
              </div>
              <div className="checkout-item-column column text-center">
                
              <span data-testid="customer_order_details__element-order-details-label-delivery-status">
                  {sale.status}
                </span>
              </div>
              <div className="checkout-item-column column text-center">
                <button
                type="button"
                onClick={ () => { }}
                data-testid="customer_order_details__button-delivery-check"
                >
                  marcar como entregue
                </button>
              </div>
            </li>

            <li className="checkout-item header">
              <div className="checkout-item-column column-simple text-center">Item</div>
              <div className="checkout-item-column column text-center">Descrição</div>
              <div className="checkout-item-column column-double text-center">
                Quantidade
              </div>
              <div className="checkout-item-column column-double text-center">
                Valor Unitário
              </div>
              <div className="checkout-item-column column-double text-center">
                Sub-total
              </div>
            </li>
            {sale.products.map((product, index) => (<ItemDetails
              key={ index }
              product={ product }
              index={ index }
              renderRemove
              prefix="customer_order_details"
            />))}
            {renderTotal()}
          </div>

        </ul>
      </>
    );
  }

  return (
    <main className="products-main">
      { sale
        ? renderMain()
        : <p className="products-cards loading">Carregando...</p>}
    </main>
  );
};

export default OrderDetails;
