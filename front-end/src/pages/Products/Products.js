import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../api/index';
import SalesInfo from '../../components/SalesInfo';
import Nav from '../../components/Nav';
import '../index.css';
import * as ProductComponent from '../../components/Products';

const Products = () => {
  const infoUsuario = JSON.parse(localStorage.user);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAllProducts(infoUsuario.token);
      const todosProdutos = data.map((d) => {
        d.quantidade = 0;
        return d;
      });
      setProdutos(todosProdutos);
    };
    fetchData();
  }, [infoUsuario.token]);

  return (
    <main>
      <Nav />
      <ProductComponent produtos={ produtos } setProdutos={ setProdutos } />
      <SalesInfo produtosCarrinho={ produtos } />
    </main>
  );
};

export default Products;
