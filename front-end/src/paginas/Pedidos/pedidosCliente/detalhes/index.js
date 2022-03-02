import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { fetchSaleById, getSellers } from '../../../../api';
import NavBarCliente from '../../../Produtos/Componentes/Nav';

const DetalhesPedidoCliente = () => {
  const infoUsuario = JSON.parse(localStorage.user);
  const { id } = useParams();
  const history = useHistory();
  const [detalhes, setDetalhes] = useState([]);
  const [listaVendedores, setListaVendedores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchSaleById(id, infoUsuario.token);
      setDetalhes(data);
    };

    const fetchSeller = async () => {
      const { data } = await getSellers(infoUsuario.token);
      setListaVendedores([data]);
    };
    fetchSeller();
    fetchData();

    console.log(detalhes, listaVendedores);
  }, [infoUsuario.token]);

  return (
    <div>
      <NavBarCliente />
      <ul>
        { detalhes.length !== 0 ? detalhes.products.map((produto) => (
          <li key={ produto.id }>
            <div>
              <p>{ produto.id }</p>
            </div>
            <h5>{produto.name}</h5>
            <span>
              { `Valor unitario: ${produto.price}` }
            </span>
            <p>
              { `Quantidade: ${produto.salesProduct.quantity}` }
            </p>
            <p>
              { `sub-total: ${Math.round(
                100 * produto.salesProduct.quantity * produto.price,
              ) / 100}` }
            </p>
          </li>
        )) : 'Carregando' }
      </ul>
    </div>
  );
};

export default DetalhesPedidoCliente;
