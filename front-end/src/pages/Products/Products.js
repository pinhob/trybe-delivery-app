import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAllProducts } from '../../api/index';
import SalesInfo from '../../components/SalesInfo';
import Nav from '../../components/Nav';
import '../index.css';
import * as ProductComponent from '../../components/Products';

const Products = () => {
  const history = useHistory();
  // const infoUsuario = (localStorage.user) ? JSON.parse(localStorage.user) : null; // ORIGINAL
  const infoUsuario = {
    name: 'Zé da Faca Delivery',
    email: 'ze_da_faca@gmail.com',
    role: 'customer',
    // eslint-disable-next-line max-len
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IlrDqSBkYSBGYWNhIERlbGl2ZXJ5IiwiZW1haWwiOiJ6ZV9kYV9mYWNhQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0NjQyNzc5MywiZXhwIjoxNjQ2NDYwMzkzfQ.1SfOBO6tX8SvvvnP7AEj2_5JOocRwg3qRrRZL_SZL3k',
  };
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    if (!localStorage.user) {
      history.push('/login');
    }
  }, [history]);

  useEffect(() => {
    if (infoUsuario) {
      const fetchData = async () => {
        const { data } = await fetchAllProducts(infoUsuario.token);
        const todosProdutos = data.map((d) => {
          d.quantidade = 0;
          return d;
        });
        setProdutos(todosProdutos);
      };
      fetchData();
    }
  }, [infoUsuario]);

  function renderMain() {
    return (
      <>
        <Nav />
        <ProductComponent produtos={ produtos } setProdutos={ setProdutos } />
        <SalesInfo produtosCarrinho={ produtos } />
      </>
    );
  }

  return (
    <main>
      {produtos.length !== 0 && renderMain()}
    </main>
  );
};

export default Products;
