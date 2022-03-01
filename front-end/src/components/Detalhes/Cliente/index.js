import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { createSale, getSellers } from '../../../api';

const DetalhesCliente = ({ carrinho }) => {
  const [vendedores, setVendedores] = useState([]);
  const userData = JSON.parse(localStorage.user);
  const itensPedido = carrinho.filter((p) => p.quantidade !== 0);
  const subTotais = carrinho.map((c) => Math.round(c.price * c.quantidade * 100) / 100);
  const precoTotal = subTotais.reduce(
    (prevValue, nextValue) => prevValue + nextValue,
    0,
  );
  const history = useHistory();
  const [idVendedor, setIdVendedor] = useState(2);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  const produtosParaVenda = itensPedido.map((item) => ({
    productId: item.id,
    quantity: item.quantidade,
  }));

  const saleObj = {
    userId: userData.id,
    sellerId: idVendedor,
    totalPrice: Math.round(precoTotal * 100) / 100,
    deliveryAddress,
    deliveryNumber,
    status: 'pendente',
    products: produtosParaVenda,
  };

  const finalizarCompra = async () => {
    console.log(saleObj);
    await createSale(saleObj, userData.token);

    carrinho.forEach((element) => {
      element.quantidade = 0;
      return null;
    });
    history.push('/produtos');
  };

  const buscaIdVendedora = (nome = 'Fulana Pereira') => {
    const vendedorData = vendedores.find((vendedor) => vendedor.name === nome);
    setIdVendedor(vendedorData.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getSellers(userData.token);
      setVendedores(data);
    };
    fetchData();
  }, [userData.token, itensPedido]);

  return (
    <div>
      <section>
        Finalizar Pedido
        <div className="head">
          <ul>
            {itensPedido.map((c, index) => (
              <li key={ index }>
                <div>
                  <span>{ index + 1 }</span>
                  <h4>{ c.name }</h4>
                  <h4>{`Quantidade: ${c.quantidade}`}</h4>
                  <h4>{`Valor unitario: ${c.price}`}</h4>
                  <h4>{`Sub-Total:${Math.round(c.price * c.quantidade * 100) / 100}`}</h4>
                </div>
              </li>
            ))}
          </ul>
          <h3>{Math.round(precoTotal * 100) / 100}</h3>
        </div>
        Detalhes e Endereco para Entrega
        <div>
          <label htmlFor="pessoa-vendedora">
            <select onClick={ (e) => buscaIdVendedora(e.target.value) } id="pessoa-vendedora">
              P. Vendedora resposavel
              {vendedores.map((v) => (
                <option key={ v.id }>
                  {v.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="address">
            Endereco
            <input onChange={ (e) => setDeliveryAddress(e.target.value) } id="address" type="text" />
          </label>
          <label htmlFor="number">
            Numero
            <input onChange={ (e) => setDeliveryNumber(e.target.value) } id="number" type="text" />
          </label>
        </div>
        <div>
          <button onClick={ finalizarCompra } type="submit">FINALIZAR PEDIDO</button>
        </div>
      </section>
    </div>
  );
};

DetalhesCliente.propTypes = {
  carrinho: PropTypes.shape({}).isRequired,
};

export default DetalhesCliente;
