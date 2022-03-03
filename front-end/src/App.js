import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Comum from './pages';
import Products from './pages/Products';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Comum } />
      <Route path="/login" component={ Login } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/orders" component={ Orders } />
      <Route path="/customer/orders/:id" component={ OrderDetails } />
    </Switch>
  );
}

export default App;
