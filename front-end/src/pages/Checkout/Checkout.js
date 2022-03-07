import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { fetchAllProducts } from '../../api/index';
import { useSelector } from 'react-redux';
// import Nav from '../../components/Nav';
import '../index.css';

const Checkout = () => {
  const produsctsState = useSelector((state) => state.shoppingCart.products);
  // const history = useHistory();
  // const infoUsuario = (localStorage.user) ? JSON.parse(localStorage.user) : null; // ORIGINAL

  // const [totalCart, setTotalCart] = useState(0);

  // const infoUsuario = {
  //   name: 'Zé da Faca Delivery',
  //   email: 'ze_da_faca@gmail.com',
  //   role: 'customer',
  //   // eslint-disable-next-line max-len
  //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IlrDqSBkYSBGYWNhIERlbGl2ZXJ5IiwiZW1haWwiOiJ6ZV9kYV9mYWNhQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0NjQyNzc5MywiZXhwIjoxNjQ2NDYwMzkzfQ.1SfOBO6tX8SvvvnP7AEj2_5JOocRwg3qRrRZL_SZL3k',
  // };

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
        {/* <Nav
          totalCart={ totalCart }
          userLogged={ infoUsuario }
        /> */}
        <ul className="products-cards">
          {/* <li className="checkout-item header"></li>
          <h1>cabeçalho</h1>
          {produsctsState.map((product, index) => (
            <li key={ product.id } className="checkout-item">
              <p></p>
            </li>
          ))} */}
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

export default Checkout;
