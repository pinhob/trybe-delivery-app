import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  addQtyItem, subQtyItem, changeQtyItem,
} from '../app/slices/shoppingCart';

const ProductCard = ({ product, index }) => {
  const dispatch = useDispatch();

  return (
    <li key={ product.id } className="product-card">
      <div className="product-card-body">
        <img
          className="product-card-image"
          src={ product.urlImage }
          alt={ `foto ${product.name}` }
          data-testid={ `customer_products__img-card-bg-image-${product.id}` }
        />
        <p>
          {'R$ '}
          <span data-testid={ `customer_products__element-card-price-${product.id}` }>
            {(product.price === 'string')
              ? (product.price).replace('.', ',')
              : (product.price).toString().replace('.', ',')}
          </span>
        </p>
      </div>
      <div className="product-card-footer">
        <p data-testid={ `customer_products__element-card-title-${product.id}` }>
          {product.name}
        </p>
        <div className="product-card-footer-quantity">
          <button
            onClick={ () => dispatch(subQtyItem({ product, index })) }
            type="button"
            className="product-card-button subItem"
            data-testid={ `customer_products__button-card-rm-item-${product.id}` }
          >
            -
          </button>
          <input
            onChange={ (event) => dispatch(changeQtyItem({
              index, value: event.target.value,
            })) }
            name="quantity"
            className="product-card-quantity"
            type="number"
            min="0"
            value={ product.quantity }
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
          />
          <button
            onClick={ () => dispatch(addQtyItem({ product, index })) }
            type="button"
            className="product-card-button addItem"
            data-testid={ `customer_products__button-card-add-item-${product.id}` }
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductCard;
