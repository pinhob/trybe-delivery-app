import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { fetchAllProducts } from '../../api/index';
import { useSelector } from 'react-redux';
import Nav from '../../components/Nav';
import '../index.css';
import ProductCard from '../../components/ProductCard';

const Orders = () => {
  const produsctsState = useSelector((state) => state.shoppingCart.products);
  // const history = useHistory();
  // const infoUsuario = (localStorage.user) ? JSON.parse(localStorage.user) : null; // ORIGINAL

  // const [totalCart, setTotalCart] = useState(0);

  // const getTotalCart = () => {
  //   setTotalCart(
  //     produsctsState
  //       .reduce((acc, currProd) => (currProd.price * currProd.quantity) + acc, 0),
  //   );
  // };

  // useEffect(() => {
  //   getTotalCart();
  // }, []);

  // useEffect(() => {
  //   if (!localStorage.user) {
  //     history.push('/login');
  //   }
  // }, [history]);

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
      <h1>Xablau</h1>
      {produsctsState.length !== 0
        ? renderMain()
        : <p className="products-cards loading">Carregando...</p>}
    </main>
  );
};

export default Orders;
