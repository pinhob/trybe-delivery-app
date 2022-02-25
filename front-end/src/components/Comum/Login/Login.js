import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { infoUser } from '../../../app/slices/user';
import { loginUser } from '../../../api';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [dataUser, setDataUser] = useState({
    name: '',
    password: '',
  });

  const handleClick = (e) => {
    e.preventDefault();

    if (e.target.name === 'cadastrar') {
      history.push('/cadastro');
    }
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    const { name, password } = dataUser;
    const { data } = await loginUser(name, password);

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
          Faça seu Login
        </div>
        <form>
          <label htmlFor="name">
            <input
              onChange={ (e) => setDataUser({ ...dataUser, name: e.target.value }) }
              type="name"
              placeholder="name"
              name="name"
              id="name"
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
            <button onClick={ handleClickLogin } name="login" type="submit">LOGIN</button>
          </div>
          <div>
            <button
              onClick={ handleClick }
              name="cadastrar"
              type="submit"
            >
              Ainda não tenho conta
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
