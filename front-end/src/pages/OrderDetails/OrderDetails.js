import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchSaleById, getSellers } from '../../api';
import Nav from '../../components/Nav';

const OrderDetails = () => {
  const infoUsuario = JSON.parse(localStorage.user);
  const { id } = useParams();
  // const history = useHistory();
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
  }, [detalhes, id, infoUsuario.token, listaVendedores]);
  // }, [infoUsuario.token]); // estava dessa forma

  return (
    <div>
      <Nav />
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

export default OrderDetails;
