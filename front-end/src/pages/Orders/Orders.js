import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { fetchAllSales } from '../../api';
import Nav from '../../components/Nav';

const dateFormat = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear();
  return (
    `${day}/${month}/${year}`
  );
};

const PedidosClientes = () => {
  const [infoUsuario, setInfoUsuario] = useState(
    (localStorage.user) ? JSON.parse(localStorage.user) : null,
  );
  const history = useHistory();
  const [vendas, setVendas] = useState([]);

  const PREFIX = (infoUsuario.role === 'customer')
    ? 'customer_orders' : 'seller_orders';

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAllSales(infoUsuario.token);
      setVendas(data);
    };
    fetchData();
  }, [infoUsuario.token]);

  const verDetalhes = (id) => {
    const redirect = infoUsuario.role === 'customer'
      ? history.push(`/customer/orders/${id}`)
      : history.push(`/seller/orders/${id}`);

    return redirect;
  };

  return (
    <div>
      <Nav
        totalCart={ 10 }
        userLogged={ infoUsuario }
        setInfoUsuario={ setInfoUsuario }
        renderCart={ false }
      />
      <ul>
        {vendas.map((venda) => (
          <li key={ venda.id }>
            <button onClick={ () => verDetalhes(venda.id) } type="button">
              <div>
                <p>
                  { 'Pedido ' }
                  <span data-testid={ `${PREFIX}__element-order-id-${venda.id}` }>
                    {venda.id}
                  </span>
                </p>
              </div>
              <div>
                <div>
                  <h5
                    data-testid={ `${PREFIX}__element-delivery-status-${venda.id}` }
                  >
                    {venda.status}
                  </h5>
                </div>
                <p
                  data-testid={ `${PREFIX}__element-order-date-${venda.id}` }
                >
                  { dateFormat(venda.saleDate) }
                </p>
                <p data-testid={ `${PREFIX}__element-card-price-${venda.id}` }>
                  { venda.totalPrice.replace('.', ',') }
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidosClientes;
