import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../api/index';
import DetalhesCliente from '../Detalhes/Cliente';
import NavBarCliente from '../NavsBar/ClienteNavBar';

const Products = () => {
  const [produtos, setProdutos] = useState([]);
  const userData = JSON.parse(localStorage.user);

  const addItem = (item, index) => {
    const quantidade = item.quantidade + 1;

    setProdutos(Object.values(
      { ...produtos, [index]: { ...produtos[index], quantidade } },
    ));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAllProducts(userData.token);
      const newData = data.map((d) => {
        d.quantidade = 0;
        return d;
      });
      setProdutos(newData);
    };
    fetchData();
  }, [userData.token]);

  return (
    <main>
      <NavBarCliente />
      <ul>
        {produtos.map((p, index) => (
          <li key={ p.id }>
            <div>
              <p>{p.price}</p>
              <img src={ p.url_image } alt="foto do produto" />
            </div>
            <div>
              <p>{p.name}</p>
              <div>
                <button type="button">-</button>
                <span>{p.quantidade}</span>
                <button onClick={ () => addItem(p, index) } type="button">+</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <DetalhesCliente carrinho={ produtos } />
    </main>
  );
};

export default Products;
