import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { infoUser } from '../app/slices/user';

import logoHorizontal from '../images/logo-horizontal.png';
import cart from '../images/cart.png';
import logout from '../images/logout.png';
import myProducts from '../images/my-products.png';
import productsSelImg from '../images/products-sel.png';
import user from '../images/user.png';

const Nav = () => {
  // const usuario = JSON.parse(localStorage.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const checkout = {
    name: '',
    email: '',
    role: '',
    token: '',
  };

  const checkoutClick = (e) => {
    e.preventDefault();
    localStorage.user = JSON.stringify(checkout);
    dispatch(infoUser(checkout));
    history.push('/login');
  };

  return (
    <main className="nav-body">
      <div className="nav-body-left">
        <button
          type="button"
          className="nav-body-button selected"
          onClick={ () => { } }
        >
          <img src={ productsSelImg } alt="Ícone de produtos" />
          Produtos
        </button>
        <button
          type="button"
          className="nav-body-button"
          onClick={ () => { } }
        >
          <img src={ myProducts } alt="Ícone de Meus produtos" />
          Meus Pedidos
        </button>
      </div>
      <div>
        <img src={ logoHorizontal } alt="Logo Dona Tereza" />
      </div>
      <div className="nav-body-right">
        <button
          type="button"
          className="nav-body-button"
          onClick={ () => { } }
        >
          <img src={ user } alt="Ícone do usuário" />
          Nome do usuário
        </button>
        <button
          type="button"
          className="nav-body-button logout"
          onClick={ () => { } }
        >
          <img src={ logout } alt="Ícone de sair" />
          Sair
        </button>
        <button
          type="button"
          className="nav-body-button"
          onClick={ () => { } }
        >
          <img src={ cart } alt="Ícone do carrinho de compras" />
          Carrinho: R$ 999,99
        </button>
      </div>
    </main>
  );
};

export default Nav;
