import React from 'react';
import NavBarCliente from '../../NavsBar/ClienteNavBar';

const DetalhesCliente = () => {
  const detalhes = {
    PessoaVendedora: 'Fulana Pereira',
  };

  return (
    <div>
      <NavBarCliente />
      <section>
        <div className="head">
          <ul>
            <li>
              PEDIDO 0003;
            </li>
            <li>
              P.Vend:
              { detalhes.PessoaVendedora }
            </li>
            <li>
              07/04/2021
            </li>
            <li>
              ENTREGUE
            </li>
            <button type="submit">MARCAR COMO ENTREGUE</button>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DetalhesCliente;
