import React from 'react';
import './App.css';
import Cadastro from './components/Comum/Cadastro/Cadastro';
import Login from './components/Comum/Login/Login';
import {
  Switch,
  Route,
} from "react-router-dom";
import Comum from './components/Comum/Comum/Comum';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={ Comum } />
      <Route path='/login' component={ Login } />
      <Route path='/cadastro' component={ Cadastro } />
    </Switch>
  );
}

export default App;
