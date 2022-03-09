import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { fetchSaleById, updateStatusSale } from '../../api';
import Nav from '../../components/Nav';
import ItemDetails from '../../components/ItemDetails';

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
  const [isDeliveryStatusButton, setIsDeliveryStatusButton] = useState(false);
  const [isPreparingStatusButton, setIsPreparingStatusButton] = useState(false);
  const [isDispatchStatusButton, setIsDispatchStatusButton] = useState(false);
  const [infoUsuario, setInfoUsuario] = useState(
    (localStorage.user) ? JSON.parse(localStorage.user) : null,
  );
  const PREFIX = (infoUsuario.role === 'customer')
    ? 'customer_order_details' : 'seller_order_details';

  const fetchSale = async () => {
    const { data } = await fetchSaleById(id, infoUsuario.token);
    setSale(data);

    switch (data.status) {
    case 'Pendente':
      setIsPreparingStatusButton(false);
      setIsDispatchStatusButton(true);
      setIsDeliveryStatusButton(true);
      break;
    case 'Preparando':
      setIsPreparingStatusButton(true);
      setIsDispatchStatusButton(false);
      setIsDeliveryStatusButton(true);
      break;
    case 'Em Trânsito':
      setIsPreparingStatusButton(true);
      setIsDispatchStatusButton(true);
      setIsDeliveryStatusButton(false);
      break;
    default:
      setIsPreparingStatusButton(true);
      setIsDispatchStatusButton(true);
      setIsDeliveryStatusButton(true);
      break;
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

  async function submitUpdateStatusSale(status) {
    const UPDATED_STATUS = 200;

    const updateSale = await updateStatusSale(sale.id, status, infoUsuario.token);
    if (updateSale.status === UPDATED_STATUS) {
      fetchSale();
    }
  }

  function renderSellerItem() {
    return (
      <div className="order-detail-item-column">
        { 'P.vend: ' }
        <span
          data-testid={ `${PREFIX}__element-order-details-label-seller-name` }
        >
          { sale.seller.name }
        </span>
      </div>
    );
  }

  function renderButtonDelivery() {
    return (
      <button
        type="button"
        onClick={ () => submitUpdateStatusSale('Entregue') }
        data-testid={ `${PREFIX}__button-delivery-check` }
        disabled={ isDeliveryStatusButton }
      >
        Marcar como entregue
      </button>
    );
  }

  function renderButtonPreparing() {
    return (
      <button
        type="button"
        onClick={ () => submitUpdateStatusSale('Preparando') }
        data-testid={ `${PREFIX}__button-preparing-check` }
        disabled={ isPreparingStatusButton }
      >
        Preparando pedido
      </button>
    );
  }

  function renderButtonDispatch() {
    return (
      <button
        type="button"
        onClick={ () => submitUpdateStatusSale('Em Trânsito') }
        data-testid={ `${PREFIX}__button-dispatch-check` }
        disabled={ isDispatchStatusButton }
      >
        Saiu para entrega
      </button>
    );
  }

  function renderOrderDetails(role) {
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
        { role === 'customer' && renderSellerItem() }
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
          { role === 'customer' && renderButtonDelivery() }
          { role === 'seller' && renderButtonPreparing() }
          { role === 'seller' && renderButtonDispatch() }
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
            { renderOrderDetails(infoUsuario.role) }
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
