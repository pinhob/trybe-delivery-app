import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { infoUser } from '../app/slices/user';

const Nav = () => {
  const usuario = JSON.parse(localStorage.user);
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
    <main className="main-container">
      <div>
        <ul>
          <li>
            PRODUTOS
          </li>
          <button onClick={ () => history.push('/meuspedidos') } type="button">
            MEUS PEDIDOS
          </button>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            {usuario.name}
          </li>
          <button onClick={ checkoutClick } type="button">
            Sair
          </button>
        </ul>
      </div>
    </main>
  );
};

export default Nav;
