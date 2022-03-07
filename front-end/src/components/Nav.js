import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import logoHorizontal from '../images/logo-horizontal.png';
import cart from '../images/cart.png';
import logoutImg from '../images/logout.png';
import myProducts from '../images/my-products.png';
import productsSelImg from '../images/products-sel.png';
import user from '../images/user.png';

const Nav = ({ totalCart, userLogged, setInfoUsuario }) => {
  const history = useHistory();

  function logout() {
    localStorage.clear();
    setInfoUsuario(null);
    history.push('/login');
  }

  return (
    <main className="nav-body">
      <div className="nav-body-left">
        <button
          type="button"
          className="nav-body-button selected"
          onClick={ () => history.push('/customer/products') }
          data-testid="customer_products__element-navbar-link-products"
        >
          <img src={ productsSelImg } alt="Ícone de produtos" />
          Produtos
        </button>
        <button
          type="button"
          className="nav-body-button"
          onClick={ () => history.push('/customer/orders') }
          data-testid="customer_products__element-navbar-link-orders"
        >
          <img src={ myProducts } alt="Ícone de Meus produtos" />
          Meus Pedidos
        </button>
      </div>
      <div>
        <img src={ logoHorizontal } alt="Logo Dona Tereza" />
      </div>
      <div className="nav-body-right">
        <p
          className="nav-body-button"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          <img src={ user } alt="Ícone do usuário" />
          {userLogged.name}
        </p>
        <button
          type="button"
          className="nav-body-button logout"
          onClick={ () => logout() }
          data-testid="customer_products__element-navbar-link-logout"
        >
          <img src={ logoutImg } alt="Ícone de sair" />
          Sair
        </button>
        <button
          type="button"
          className="nav-body-button"
          onClick={ () => history.push('/customer/checkout') }
          data-testid="customer_products__button-cart"
          disabled={ totalCart === 0.00 }
        >
          <img src={ cart } alt="Ícone do carrinho de compras" />
          {'Carrinho: R$ '}
          <span data-testid="customer_products__checkout-bottom-value">
            {(totalCart.toFixed(2)).replace('.', ',')}
          </span>
        </button>
      </div>
    </main>
  );
};

Nav.propTypes = {
  totalCart: PropTypes.number.isRequired,
  userLogged: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
  setInfoUsuario: PropTypes.func.isRequired,
};

export default Nav;
