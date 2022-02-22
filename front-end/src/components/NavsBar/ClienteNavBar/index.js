import React from 'react';
import './NavBarCliente.css';

const NavBarCliente = () => {
  const user = {
    name: 'Cicrado da Silva',
  };

  return (
    <main className="main-container">
      <div>
        <ul>
          <li>
            PRODUTOS
          </li>
          <li>
            MEUS PEDIDOS
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            {user.name}
          </li>
          <li>
            Sair
          </li>
        </ul>
      </div>
    </main>
  );
};

export default NavBarCliente;
