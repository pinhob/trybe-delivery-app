import React from 'react';

const DetalhesCliente = ({ carrinho }) => {
  const itensPedido = carrinho.filter((p) => p.quantidade !== 0);
  const subTotais = carrinho.map((c) => Math.round(c.price * c.quantidade * 100) / 100 );
  const precoTotal = subTotais.reduce(
    (prevValue, nextValue) => prevValue + nextValue,
    0,
  );

  return (
    <div>
      <section>
        Finalizar Pedido
        <div className="head">
          <ul>
            {itensPedido.map((c, index) => (
              <li key={ index }>
                <div>
                  <span>{ index }</span>
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
          {/* Aqui terei que criar um componente e passar informações por
          props pois o lint esta reclamando
          
          Lado bom é que faço a requicao dos vendedores Lá*/}
          <label htmlFor="pessoa-vendedora">
            <select id="pessoa-vendedora">
              P. Vendedora resposavel
              <option>
                Eu faço uma req pro back buscando os vendedores
              </option>
            </select>
          </label>
          <label htmlFor="address">
            Endereco
            <input id="address" type="text" />
          </label>
          <label htmlFor="number">
            Numero
            <input id="number" type="text" />
          </label>
        </div>
        <div>
          <button type="submit">FINALIZAR PEDIDO</button>
        </div>
      </section>
    </div>
  );
};

export default DetalhesCliente;
