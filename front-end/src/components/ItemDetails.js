import React from 'react';
import PropTypes from 'prop-types';

const ItemDetails = ({ product, index, removeItemCart }) => (
  <li key={ product.id } className="checkout-item item-row">
    <div className="checkout-item-column column-simple">
      <p
        data-testid={
          `customer_checkout__element-order-table-item-number-${index}`
        }
      >
        { index + 1 }
      </p>
    </div>
    <div className="checkout-item-column column">
      <p data-testid={ `customer_checkout__element-order-table-name-${index}` }>
        { product.name }
      </p>
    </div>
    <div className="checkout-item-column column-double text-center">
      <p data-testid={ `customer_checkout__element-order-table-quantity-${index}` }>
        { product.quantity }
      </p>
    </div>
    <div className="checkout-item-column column-double text-right">
      <p>
        { 'R$ '}
        <span
          data-testid={
            `customer_checkout__element-order-table-unit-price-${index}`
          }
        >
          {(product.price).toString().replace('.', ',')}
        </span>
      </p>
    </div>
    <div className="checkout-item-column column-double text-right">
      <p>
        { 'R$ ' }
        <span
          data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
        >
          {(product.price * product.quantity).toFixed(2).replace('.', ',')}
        </span>
      </p>
    </div>
    <div className="checkout-item-column column-double">
      <button
        onClick={ () => removeItemCart(product.nIndex) }
        type="button"
        className="checkout-item-column-btn-remove"
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
      >
        Remover
      </button>
    </div>
  </li>
);

ItemDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nIndex: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeItemCart: PropTypes.func.isRequired,
};

export default ItemDetails;
