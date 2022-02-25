import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Cadastro from './components/Comum/Cadastro/Cadastro';
import Login from './components/Comum/Login/Login';
import Comum from './components/Comum/Comum/Comum';
import Products from './components/Produtos';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Comum } />
      <Route path="/login" component={ Login } />
      <Route path="/produtos" component={ Products } />
      <Route path="/cadastro" component={ Cadastro } />
    </Switch>
  );
}

export default App;
