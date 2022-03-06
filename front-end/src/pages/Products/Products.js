import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { fetchAllProducts } from '../../api/index';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../app/slices/shoppingCart';
import Nav from '../../components/Nav';
import '../index.css';
import ProductCard from '../../components/ProductCard';

const Products = () => {
  const dispatch = useDispatch();
  const produsctsState = useSelector((state) => state.shoppingCart.products);
  // const history = useHistory();
  // const infoUsuario = (localStorage.user) ? JSON.parse(localStorage.user) : null; // ORIGINAL

  // const [products, setProducts] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

  const infoUsuario = {
    name: 'Zé da Faca Delivery',
    email: 'ze_da_faca@gmail.com',
    role: 'customer',
    // eslint-disable-next-line max-len
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IlrDqSBkYSBGYWNhIERlbGl2ZXJ5IiwiZW1haWwiOiJ6ZV9kYV9mYWNhQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0NjQyNzc5MywiZXhwIjoxNjQ2NDYwMzkzfQ.1SfOBO6tX8SvvvnP7AEj2_5JOocRwg3qRrRZL_SZL3k',
  };

  const mockProducts = [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: 2.20,
      url_image: 'http://192.168.1.76:3001/images/skol_lata_350ml.jpg',
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: 7.50,
      url_image: 'http://192.168.1.76:3001/images/heineken_600ml.jpg',
    },
    {
      id: 3,
      name: 'Antarctica Pilsen 300ml',
      price: 2.49,
      url_image: 'http://192.168.1.76:3001/images/antarctica_pilsen_300ml.jpg',
    },
    {
      id: 4,
      name: 'Brahma 600ml',
      price: 7.50,
      url_image: 'http://192.168.1.76:3001/images/brahma_600ml.jpg',
    },
    {
      id: 5,
      name: 'Skol 269ml',
      price: 2.19,
      url_image: 'http://192.168.1.76:3001/images/skol_269ml.jpg',
    },
    {
      id: 6,
      name: 'Skol Beats Senses 313ml',
      price: 4.49,
      url_image: 'http://192.168.1.76:3001/images/skol_beats_senses_313ml.jpg',
    },
    {
      id: 7,
      name: 'Becks 330ml',
      price: 4.99,
      url_image: 'http://192.168.1.76:3001/images/becks_330ml.jpg',
    },
    {
      id: 8,
      name: 'Brahma Duplo Malte 350ml',
      price: 2.79,
      url_image: 'http://192.168.1.76:3001/images/brahma_duplo_malte_350ml.jpg',
    },
    {
      id: 9,
      name: 'Becks 600ml',
      price: 8.89,
      url_image: 'http://192.168.1.76:3001/images/becks_600ml.jpg',
    },
    {
      id: 10,
      name: 'Skol Beats Senses 269ml',
      price: 3.57,
      url_image: 'http://192.168.1.76:3001/images/skol_beats_senses_269ml.jpg',
    },
    {
      id: 11,
      name: 'Stella Artois 275ml',
      price: 3.49,
      url_image: 'http://192.168.1.76:3001/images/stella_artois_275ml.jpg',
    },
  ];

  const getTotalCart = () => {
    setTotalCart(
      produsctsState
        .reduce((acc, currProd) => (currProd.price * currProd.quantity) + acc, 0),
    );
  };

  useEffect(() => {
    getTotalCart();
  }, [produsctsState]);

  // useEffect(() => {
  //   if (!localStorage.user) {
  //     history.push('/login');
  //   }
  // }, [history]);

  const fetchData = async () => {
    // const { data } = await fetchAllProducts(infoUsuario.token);
    const data = mockProducts;
    const products = data.map((prod) => {
      prod.quantity = 0;
      return prod;
    });
    dispatch(setProducts(products));
  };

  useEffect(() => {
    if (infoUsuario) {
      fetchData();
    }
  }, []);

  function renderMain() {
    return (
      <>
        <Nav
          totalCart={ totalCart }
          userLogged={ infoUsuario }
        />
        <ul className="products-cards">
          {produsctsState.map((product, index) => (
            <ProductCard
              product={ product }
              index={ index }
              key={ index }
            />
          ))}
        </ul>
      </>
    );
  }

  return (
    <main className="products-main">
      {produsctsState.length !== 0
        ? renderMain()
        : <p className="products-cards loading">Carregando...</p>}
    </main>
  );
};

export default Products;
