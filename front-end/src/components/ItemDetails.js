import React from 'react';
import PropTypes from 'prop-types';

const renderTotalColumn = (product, index, prefix) => {
  const qtd = (product.quantity) ? product.quantity : product.salesProduct.quantity;
  return (
    <div className="checkout-item-column column-double text-right">
      <p>
        { 'R$ ' }
        <span
          data-testid={ `${prefix}__element-order-table-sub-total-${index}` }
        >
          {(product.price * qtd).toFixed(2).replace('.', ',')}
        </span>
      </p>
    </div>
  );
};
const renderRemoveButtonColumn = (product, index, removeItemCart, prefix) => (
  <div className="checkout-item-column column-double">
    <button
      onClick={ () => removeItemCart(product.nIndex) }
      type="button"
      className="checkout-item-column-btn-remove"
      data-testid={ `${prefix}__element-order-table-remove-${index}` }
    >
      Remover
    </button>
  </div>
);
const ItemDetails = ({ product, index, removeItemCart, renderRemove, prefix }) => (
  <li key={ product.id } className="checkout-item item-row">
    <div className="checkout-item-column column-simple">
      <p
        data-testid={
          `${prefix}__element-order-table-item-number-${index}`
        }
      >
        { index + 1 }
      </p>
    </div>
    <div className="checkout-item-column column">
      <p data-testid={ `${prefix}__element-order-table-name-${index}` }>
        { product.name }
      </p>
    </div>
    <div className="checkout-item-column column-double text-center">
      <p data-testid={ `${prefix}__element-order-table-quantity-${index}` }>
        { (product.quantity) ? product.quantity : product.salesProduct.quantity }
      </p>
    </div>
    <div className="checkout-item-column column-double text-right">
      <p>
        { 'R$ '}
        <span
          data-testid={
            `${prefix}__element-order-table-unit-price-${index}`
          }
        >
          {(product.price).toString().replace('.', ',')}
        </span>
      </p>
    </div>
    { renderTotalColumn(product, index, prefix) }
    { !renderRemove && renderRemoveButtonColumn(product, index, removeItemCart, prefix) }
  </li>
);

ItemDetails.defaultProps = {
  renderRemove: false,
};
ItemDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nIndex: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    salesProduct: PropTypes.shape({
      quantity: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeItemCart: PropTypes.func.isRequired,
  renderRemove: PropTypes.bool,
  prefix: PropTypes.string.isRequired,
};

export default ItemDetails;
