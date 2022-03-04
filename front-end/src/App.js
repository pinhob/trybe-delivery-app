import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Cadastro from './paginas/Cadastro';
import Login from './paginas/Login';
import Comum from './paginas';
import Produtos from './paginas/Produtos';
import DetalhesPedidoCliente from './paginas/Pedidos/pedidosCliente/detalhes';
import PedidosClientes from './paginas/Pedidos/pedidosCliente';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Comum } />
      <Route path="/login" component={ Login } />
      <Route path="/produtos" component={ Produtos } />
      <Route path="/cadastro" component={ Cadastro } />
      <Route path="/meuspedidos" component={ PedidosClientes } />
      <Route path="/detalhes/:id" component={ DetalhesPedidoCliente } />
    </Switch>
  );
}

export default App;
