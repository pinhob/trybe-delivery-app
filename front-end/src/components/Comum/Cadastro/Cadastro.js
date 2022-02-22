import React from 'react';
import './Cadastro.css';

const Cadastro = () => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.name);
  };

  return (
    <main>
      <div>
        <div>
          Faça seu Cadastro
        </div>
        <form>
          <label htmlFor="nome">
            <input
              type="nome"
              placeholder="nome"
              name="nome"
              id="nome"
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              type="password"
              placeholder="Senha"
            />
          </label>
        </form>
        <div>
          <div>
            <button onClick={ handleClick } type="submit">CADASTRAR</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cadastro;
