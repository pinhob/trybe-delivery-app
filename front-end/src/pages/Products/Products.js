import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { fetchAllProducts } from '../../api/index';
// import SalesInfo from '../../components/SalesInfo';
import Nav from '../../components/Nav';
import '../index.css';
import ProductsComponent from '../../components/Products';

const Products = () => {
  // const history = useHistory();
  // const infoUsuario = (localStorage.user) ? JSON.parse(localStorage.user) : null; // ORIGINAL
  const infoUsuario = {
    name: 'Zé da Faca Delivery',
    email: 'ze_da_faca@gmail.com',
    role: 'customer',
    // eslint-disable-next-line max-len
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IlrDqSBkYSBGYWNhIERlbGl2ZXJ5IiwiZW1haWwiOiJ6ZV9kYV9mYWNhQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0NjQyNzc5MywiZXhwIjoxNjQ2NDYwMzkzfQ.1SfOBO6tX8SvvvnP7AEj2_5JOocRwg3qRrRZL_SZL3k',
  };

  const mockProducts = [
    {
      name: 'Skol Lata 250ml',
      price: 2.20,
      url_image: 'http://192.168.1.76:3001/images/skol_lata_350ml.jpg',
    },
    {
      name: 'Heineken 600ml',
      price: 7.50,
      url_image: 'http://192.168.1.76:3001/images/heineken_600ml.jpg',
    },
    {
      name: 'Antarctica Pilsen 300ml',
      price: 2.49,
      url_image: 'http://192.168.1.76:3001/images/antarctica_pilsen_300ml.jpg',
    },
    {
      name: 'Brahma 600ml',
      price: 7.50,
      url_image: 'http://192.168.1.76:3001/images/brahma_600ml.jpg',
    },
    {
      name: 'Skol 269ml',
      price: 2.19,
      url_image: 'http://192.168.1.76:3001/images/skol_269ml.jpg',
    },
    {
      name: 'Skol Beats Senses 313ml',
      price: 4.49,
      url_image: 'http://192.168.1.76:3001/images/skol_beats_senses_313ml.jpg',
    },
    {
      name: 'Becks 330ml',
      price: 4.99,
      url_image: 'http://192.168.1.76:3001/images/becks_330ml.jpg',
    },
    {
      name: 'Brahma Duplo Malte 350ml',
      price: 2.79,
      url_image: 'http://192.168.1.76:3001/images/brahma_duplo_malte_350ml.jpg',
    },
    {
      name: 'Becks 600ml',
      price: 8.89,
      url_image: 'http://192.168.1.76:3001/images/becks_600ml.jpg',
    },
    {
      name: 'Skol Beats Senses 269ml',
      price: 3.57,
      url_image: 'http://192.168.1.76:3001/images/skol_beats_senses_269ml.jpg',
    },
    {
      name: 'Stella Artois 275ml',
      price: 3.49,
      url_image: 'http://192.168.1.76:3001/images/stella_artois_275ml.jpg',
    },
  ];

  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   if (!localStorage.user) {
  //     history.push('/login');
  //   }
  // }, [history]);

  useEffect(() => {
    if (infoUsuario) {
      const fetchData = async () => {
        // const { data } = await fetchAllProducts(infoUsuario.token);
        const data = mockProducts;
        const todosProdutos = data.map((d) => {
          d.quantity = 0;
          return d;
        });
        setProducts(todosProdutos);
      };
      fetchData();
    }
  }, [infoUsuario, mockProducts]);

  function renderMain() {
    return (
      <>
        <Nav />
        <ProductsComponent products={ products } setProducts={ setProducts } />
        {/* <SalesInfo produtosCarrinho={ produtos } /> */}
      </>
    );
  }

  return (
    <main className="products-main">
      {products.length !== 0 && renderMain()}
    </main>
  );
};

export default Products;
