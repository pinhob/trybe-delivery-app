import React from 'react';
import '../NavBarCliente.css';

const NavBarVendedor = () => {
  const user = {
    name: 'Cicrado da Silva',
  };

  return (
    <main className="main-container">
      <div>
        <ul>
          <li>
            PEDIDOS
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

export default NavBarVendedor;
