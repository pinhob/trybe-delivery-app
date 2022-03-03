import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { createSale, getSellers } from '../../../api';

const InfoDaCompra = ({ produtosCarrinho }) => {
  const [vendedores, setVendedores] = useState([]);
  const [idVendedor, setIdVendedor] = useState(2);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  const infoUsuario = JSON.parse(localStorage.user);
  const itensPedido = produtosCarrinho.filter((produto) => produto.quantidade !== 0);
  const subTotais = produtosCarrinho.map((produto) => Math.round(
    produto.price * produto.quantidade * 100,
  ) / 100);
  const precoTotal = subTotais.reduce(
    (prevValue, nextValue) => prevValue + nextValue,
    0,
  );

  const history = useHistory();

  const produtosParaVenda = itensPedido.map((item) => ({
    productId: item.id,
    quantity: item.quantidade,
  }));

  const totalPrice = Math.round(precoTotal * 100) / 100;
  const saleObj = {
    sellerId: idVendedor,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'pendente',
    products: produtosParaVenda,
  };

  const finalizarCompra = async () => {
    await createSale(saleObj, infoUsuario.token);

    produtosCarrinho.forEach((produto) => {
      produto.quantidade = 0;
      return null;
    });
    history.push('/produtos');
  };

  const buscaIdVendedora = (nome = 'Fulana Pereira') => {
    const infoVendedor = vendedores.find((vendedor) => vendedor.name === nome);
    setIdVendedor(infoVendedor.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getSellers(infoUsuario.token);
      setVendedores(data);
    };
    fetchData();
  }, [infoUsuario.token, itensPedido]);

  return (
    <div>
      <section>
        Finalizar Pedido
        <div className="head">
          <ul className="li-carrinho">
            {itensPedido.map((item, index) => (
              <li key={ index }>
                <div className="carrinhoDeCompras">
                  <span>{ index + 1 }</span>
                  <h4>{ item.name }</h4>
                  <h4>{`Quantidade: ${item.quantidade}`}</h4>
                  <h4>{`Valor unitario: ${item.price}`}</h4>
                  <h4>
                    {`Sub-Total:${Math.round(item.price * item.quantidade * 100) / 100}`}
                  </h4>
                </div>
              </li>
            ))}
          </ul>
          <h3>{Math.round(precoTotal * 100) / 100}</h3>
        </div>
        Detalhes e Endereco para Entrega
        <div>
          <label htmlFor="pessoa-vendedora">
            <select
              onClick={ (e) => buscaIdVendedora(e.target.value) }
              id="pessoa-vendedora"
            >
              P. Vendedora resposavel
              {vendedores.map((vendedor) => (
                <option key={ vendedor.id }>
                  {vendedor.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="address">
            Endereco
            <input
              onChange={ (e) => setDeliveryAddress(e.target.value) }
              id="address"
              type="text"
            />
          </label>
          <label htmlFor="number">
            Numero
            <input
              onChange={ (e) => setDeliveryNumber(e.target.value) }
              id="number"
              type="text"
            />
          </label>
        </div>
        <div>
          <button onClick={ finalizarCompra } type="submit">FINALIZAR PEDIDO</button>
        </div>
      </section>
    </div>
  );
};

InfoDaCompra.propTypes = {
  produtosCarrinho: PropTypes.shape({}).isRequired,
};

export default InfoDaCompra;
