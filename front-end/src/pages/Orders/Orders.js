import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { fetchAllSales } from '../../api';
import Nav from '../../components/Nav';

const PedidosClientes = () => {
  const infoUsuario = JSON.parse(localStorage.user);
  const history = useHistory();
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAllSales(infoUsuario.token);
      setVendas(data);
    };
    fetchData();
  }, [infoUsuario.token]);

  const verDetalhes = (id) => {
    history.push(`/detalhes/${id}`);
  };

  return (
    <div>
      <Nav />
      <ul>
        {vendas.map((venda) => (
          <li key={ venda.id }>
            <button onClick={ () => verDetalhes(venda.id) } type="button">
              <div>
                <p>{ `Pedido: ${venda.id}` }</p>
              </div>
              <div>
                <div>
                  <h5>{venda.status}</h5>
                </div>
                <p>{ venda.saleDate }</p>
                <p>{ venda.totalPrice }</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidosClientes;
