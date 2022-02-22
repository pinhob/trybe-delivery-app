import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Cadastro from './components/Comum/Cadastro/Cadastro';
import Login from './components/Comum/Login/Login';
import Comum from './components/Comum/Comum/Comum';
import NavBarCliente from './components/NavsBar/ClienteNavBar';

function App() {
  return (
    <Switch>
      <Route path="/testNavBar" component={ NavBarCliente } />
      <Route exact path="/" component={ Comum } />
      <Route path="/login" component={ Login } />
      <Route path="/cadastro" component={ Cadastro } />
    </Switch>
  );
}

export default App;
