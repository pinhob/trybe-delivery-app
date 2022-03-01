import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { infoUser } from '../../../app/slices/user';

const NavBarCliente = () => {
  const user = useSelector((state) => state.user);
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
          <button type="button">
            MEUS PEDIDOS
          </button>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            {user.name}
          </li>
          <button onClick={ checkoutClick } type="button">
            Sair
          </button>
        </ul>
      </div>
    </main>
  );
};

export default NavBarCliente;
