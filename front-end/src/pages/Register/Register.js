import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { infoUser } from '../../../app/slices/user';
import { createUser } from '../../../api';
import './Cadastro.css';

const Register = () => {
  const dispatch = useDispatch();
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    const { data } = await createUser(dataUser);
    console.log(data);
    if (data) {
      dispatch(infoUser(data));
      localStorage.user = JSON.stringify(data);
      history.push('/produtos');
    }
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
              onChange={ (e) => setDataUser({ ...dataUser, name: e.target.value }) }
              type="nome"
              placeholder="nome"
              name="nome"
              id="nome"
            />
          </label>
          <label htmlFor="email">
            <input
              onChange={ (e) => setDataUser({ ...dataUser, email: e.target.value }) }
              type="email"
              placeholder="Email"
              name="email"
              id="email"
            />
          </label>
          <label htmlFor="password">
            <input
              onChange={ (e) => setDataUser({ ...dataUser, password: e.target.value }) }
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

export default Register;
