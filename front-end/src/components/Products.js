import React from 'react';
import PropTypes from 'prop-types';

const ProductsComponent = ({ products, setProducts }) => {
  const addItem = (product, index) => {
    const quantity = product.quantity + 1;

    setProducts(Object.values(
      { ...products, [index]: { ...products[index], quantity } },
    ));
  };

  const subItem = (product, index) => {
    let quantity = 0;
    if (product.quantity > 0) {
      quantity = product.quantity - 1;
      setProducts(Object.values(
        { ...products, [index]: { ...products[index], quantity } },
      ));
    }
  };

  return (
    <ul className="products-cards">
      {products.map((product, index) => (
        <li key={ product.id } className="product-card">
          <div className="product-card-body">
            <img
              className="product-card-image"
              src={ product.url_image }
              alt={ `foto ${product.name}` }
            />
            <p>{`R$ ${(product.price).toFixed(2)}`}</p>
          </div>
          <div className="product-card-footer">
            <p>{product.name}</p>
            <div className="product-card-footer-quantity">
              <button
                onClick={ () => subItem(product, index) }
                type="button"
                className="product-card-button subItem"
              >
                -
              </button>
              <input
                onChange={ () => {} }
                name="quantity"
                className="product-card-quantity"
                type="number"
                value="0"
                data-testid=""
              />
              <button
                onClick={ () => addItem(product, index) }
                type="button"
                className="product-card-button addItem"
              >
                +
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

ProductsComponent.propTypes = {
  products: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  setProducts: PropTypes.func.isRequired,
};

export default ProductsComponent;
