import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../api/index';
import InfoDaCompra from './Componentes/infoCompra';
import NavBarCliente from './Componentes/Nav';
import '../index.css';
import Produtos from './Componentes/Produtos';

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
      <NavBarCliente />
      <Produtos produtos={ produtos } setProdutos={ setProdutos } />
      <InfoDaCompra produtosCarrinho={ produtos } />
    </main>
  );
};

export default Products;
