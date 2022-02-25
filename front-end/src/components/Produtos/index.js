import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../api/index';

const Products = () => {
  const [produtos, setProdutos] = useState([]);
  const userData = JSON.parse(localStorage.user);

  useEffect(() => {
    const fetchData = async () => {
      console.log(userData.token);
      const { data } = await fetchAllProducts(userData.token);
      setProdutos(data);
    };
    fetchData();
  }, [userData.token]);

  return (
    <ul>
      {produtos.map((p) => (
        <li key={ p.id }>
          <div>
            <p>{p.price}</p>
            <img src={ p.url_image } alt="foto do produto" />
          </div>
          <div>
            <p>{p.name}</p>
            <div>
              <button type="button">-</button>
              <span>0</span>
              <button type="button">+</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Products;
