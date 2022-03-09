import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { fetchSaleById, updateStatusSale } from '../../api';
import Nav from '../../components/Nav';
import ItemDetails from '../../components/ItemDetails';

const PREFIX = 'customer_order_details';

// const saleMock = {
//   id: 2,
//   userId: 4,
//   sellerId: 2,
//   totalPrice: '13.77',
//   deliveryAddress: 'Rua da Trybe',
//   deliveryNumber: '123',
//   saleDate: '2022-03-08T19:04:40.000Z',
//   status: 'Pendente',
//   user: {
//     id: 4,
//     name: 'Zé da Faca Delivery',
//     email: 'ze_da_faca@gmail.com',
//     role: 'customer',
//   },
//   seller: {
//     id: 2,
//     name: 'Fulana Pereira',
//     email: 'fulana@deliveryapp.com',
//     role: 'seller',
//   },
//   products: [
//     {
//       id: 1,
//       name: 'Skol Lata 250ml',
//       price: '2.20',
//       urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
//       salesProduct: {
//         quantity: 3,
//       },
//     },
//     {
//       id: 3,
//       name: 'Antarctica Pilsen 300ml',
//       price: '2.49',
//       urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
//       salesProduct: {
//         quantity: 2,
//       },
//     },
//     {
//       id: 5,
//       name: 'Skol 269ml',
//       price: '2.19',
//       urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
//       salesProduct: {
//         quantity: 1,
//       },
//     },
//   ],
// };
// const userMock = {
//   name: 'Zé da Faca Delivery',
//   email: 'ze_da_faca@gmail.com',
//   role: 'customer',
//   // eslint-disable-next-line max-len
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IlrDqSBkYSBGYWNhIERlbGl2ZXJ5IiwiZW1haWwiOiJ6ZV9kYV9mYWNhQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0NjQyNzc5MywiZXhwIjoxNjQ2NDYwMzkzfQ.1SfOBO6tX8SvvvnP7AEj2_5JOocRwg3qRrRZL_SZL3k',
// };

const dateFormat = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear();
  return (
    `${day}/${month}/${year}`
  );
};

const OrderDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [sale, setSale] = useState();
  const [isUpdateStatusButton, setIsUpdateStatusButton] = useState(true);
  const [infoUsuario, setInfoUsuario] = useState(
    (localStorage.user) ? JSON.parse(localStorage.user) : null,
  );

  const fetchSale = async () => {
    const { data } = await fetchSaleById(id, infoUsuario.token);
    setSale(data);
    if (data.status === 'Entregue') {
      setIsUpdateStatusButton(false);
    }
  };

  useEffect(() => {
    if (!infoUsuario) {
      history.push('/login');
    }
  }, [history, infoUsuario]);

  useEffect(() => {
    if (infoUsuario) {
      fetchSale();
    }
  }, []);

  async function submitUpdateStatusSale() {
    const UPDATED_STATUS = 200;

    const updateSale = await updateStatusSale(sale.id, 'Entregue', infoUsuario.token);
    if (updateSale.status === UPDATED_STATUS) {
      fetchSale();
    }
  }

  function renderOrderDetails() {
    return (
      <li className="order-detail-item item-row">
        <div className="order-detail-item-column">
          { 'Pedido ' }
          <span
            data-testid={ `${PREFIX}__element-order-details-label-order-id` }
          >
            { sale.id }
          </span>
        </div>
        <div className="order-detail-item-column">
          { 'P.vend: ' }
          <span
            data-testid={ `${PREFIX}__element-order-details-label-seller-name` }
          >
            { sale.seller.name }
          </span>
        </div>
        <div className="order-detail-item-column">
          <span
            data-testid={ `${PREFIX}__element-order-details-label-order-date` }
          >
            { dateFormat(sale.saleDate) }
          </span>
        </div>
        <div className="order-detail-item-column">
          <span
            data-testid={ `${PREFIX}__element-order-details-label-delivery-status` }
          >
            { sale.status }
          </span>
        </div>
        <div className="order-detail-item-column">
          <button
            type="button"
            onClick={ () => submitUpdateStatusSale() }
            data-testid={ `${PREFIX}__button-delivery-check` }
            disabled={ isUpdateStatusButton }
          >
            Marcar como entregue
          </button>
        </div>
      </li>
    );
  }

  function renderTotal() {
    return (
      <li className="checkout-item item-row total">
        <div className="checkout-item-column">
          <p>
            { 'Total: R$ ' }
            <span data-testid={ `${PREFIX}__element-order-total-price` }>
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
          renderCart={ false }
        />
        <ul className="products-cards checkout">
          <div className="checkout-title-body">
            <h3 className="checkout-title">Detalhe do Pedido</h3>
          </div>
          <div className="checkout-body">
            { renderOrderDetails() }
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
              prefix={ PREFIX }
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
