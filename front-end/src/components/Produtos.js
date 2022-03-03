import React from 'react';
import PropTypes from 'prop-types';

const Produtos = ({ produtos, setProdutos }) => {
  const addItem = (produto, index) => {
    const quantidade = produto.quantidade + 1;

    setProdutos(Object.values(
      { ...produtos, [index]: { ...produtos[index], quantidade } },
    ));
  };

  const subItem = (produto, index) => {
    let quantidade = 0;
    if (produto.quantidade > 0) {
      quantidade = produto.quantidade - 1;
      setProdutos(Object.values(
        { ...produtos, [index]: { ...produtos[index], quantidade } },
      ));
    }
  };

  return (
    <ul>
      {produtos.map((produto, index) => (
        <li key={ produto.id }>
          <div>
            <p>{produto.price}</p>
            <img src={ produto.url_image } alt="foto do produto" />
          </div>
          <div>
            <p>{produto.name}</p>
            <div>
              <button onClick={ () => subItem(produto, index) } type="button">-</button>
              <span>{produto.quantidade}</span>
              <button onClick={ () => addItem(produto, index) } type="button">+</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

Produtos.propTypes = {
  produtos: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  setProdutos: PropTypes.func.isRequired,
};

export default Produtos;
