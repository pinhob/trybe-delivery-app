import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSale } from '../../api/index';
import { changeQtyItem } from '../../app/slices/shoppingCart';
import Nav from '../../components/Nav';
import ItemDetails from '../../components/ItemDetails';
import '../../App.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const produsctsState = useSelector((state) => state.shoppingCart.products);
  const sellersState = useSelector((state) => state.sellers.sellers);
  const history = useHistory();
  const [infoUsuario, setInfoUsuario] = useState(
    (localStorage.user) ? JSON.parse(localStorage.user) : null,
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellerSelect, setSellerSelect] = useState(sellersState[0].name);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [isValidSubmit, setIsValidSubmit] = useState(false);

  const getTotalPrice = () => {
    setTotalPrice(
      produsctsState
        .reduce((acc, currProd) => (currProd.price * currProd.quantity) + acc, 0),
    );
  };

  useEffect(() => {
    setIsValidSubmit(sellerSelect !== ''
    || deliveryAddress !== ''
    || deliveryNumber !== '');
  }, [sellerSelect, deliveryAddress, deliveryNumber]);

  useEffect(() => {
    getTotalPrice();
  }, [produsctsState]);

  useEffect(() => {
    if (!infoUsuario) {
      history.push('/login');
    }
  }, [history, infoUsuario]);

  function removeItemCart(index) {
    dispatch(changeQtyItem({ index, value: 0 }));
  }

  function getProductsCart() {
    // map para adicionar um campo index que auxiliará nos testes
    const result = produsctsState.map((prod, index) => {
      const newObject = { ...prod };
      newObject.nIndex = index;
      return newObject;
    });
    return result.filter((product) => (product.quantity > 0));
  }

  async function submitCheckout() {
    const CREATED_STATUS = 201;
    const products = getProductsCart()
      .map((product) => ({ productId: product.id, quantity: product.quantity }));
    const seller = sellersState.find((item) => item.name === sellerSelect);

    const sale = {
      userId: infoUsuario.id,
      sellerId: (!seller) ? 2 : seller.id,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status: 'Pendente',
      products,
    };
    const newSale = await createSale(sale, infoUsuario.token);
    if (newSale.status === CREATED_STATUS) {
      history.push(`/customer/orders/${newSale.data.id}`);
    }
  }

  function renderTotal() {
    return (
      <li className="checkout-item item-row total">
        <div className="checkout-item-column">
          <p>
            { 'Total: R$ ' }
            <span data-testid="customer_checkout__element-order-total-price">
              {(totalPrice).toFixed(2).replace('.', ',')}
            </span>
          </p>
        </div>
      </li>
    );
  }

  function renderTotalSubmitOrder() {
    return (
      <>
        <div className="checkout-title-body">
          <h3 className="checkout-title">Detalhes e Endereço para Entrega</h3>
        </div>
        <div className="checkout-body">
          <form>
            <label htmlFor="seller">
              P. Vendedora Responsável:
              <select
                name="seller"
                id="seller"
                onChange={ (event) => setSellerSelect(event.target.value) }
                data-testid="customer_checkout__select-seller"
              >
                { sellersState.map((seller, index) => (
                  <option key={ index } value={ seller.name }>{ seller.name }</option>))}
              </select>
            </label>
            <label htmlFor="deliveryAddress">
              Endereço
              <input
                onChange={ (event) => setDeliveryAddress(event.target.value) }
                type="text"
                name="deliveryAddress"
                id="deliveryAddress"
                value={ deliveryAddress }
                data-testid="customer_checkout__input-address"
              />
            </label>
            <label htmlFor="deliveryNumber">
              Número
              <input
                onChange={ (event) => setDeliveryNumber(event.target.value) }
                type="text"
                name="deliveryNumber"
                id="deliveryNumber"
                value={ deliveryNumber }
                data-testid="customer_checkout__input-addressNumber"
              />
            </label>
          </form>
          <li className="checkout-item item-row submit">
            <div className="checkout-item-column">
              <button
                type="button"
                onClick={ submitCheckout }
                data-testid="customer_checkout__button-submit-order"
                disabled={ !isValidSubmit }
              >
                Finalizar Pedido
              </button>
            </div>
          </li>
        </div>
      </>
    );
  }

  function renderMain() {
    return (
      <>
        <Nav
          totalCart={ totalPrice }
          userLogged={ infoUsuario }
          setInfoUsuario={ setInfoUsuario }
        />
        <ul className="products-cards checkout">
          <div className="checkout-title-body">
            <h3 className="checkout-title">Finalizar Pedido</h3>
          </div>
          <div className="checkout-body">
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
              <div className="checkout-item-column column-double text-center">
                Remover Item
              </div>
            </li>
            {getProductsCart()
              .map((productMap, index) => (<ItemDetails
                key={ index }
                product={ productMap }
                index={ index }
                removeItemCart={ removeItemCart }
              />))}
            {renderTotal()}
          </div>
          { renderTotalSubmitOrder() }
        </ul>
      </>
    );
  }

  return (
    <main className="products-main">
      {produsctsState.length !== 0
        ? renderMain()
        : <p className="products-cards loading">Carregando...</p>}
    </main>
  );
};

export default Checkout;
