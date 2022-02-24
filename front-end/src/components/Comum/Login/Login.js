import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../../../api';
import './Login.css';

const Login = () => {
  const history = useHistory();

  const [dataUser, setDataUser] = useState({
    email: '',
    password: '',
  });

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.name);

    if (e.target.name === 'cadastrar') {
      history.push('/cadastro');
    }
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    const { email, password } = dataUser;
    const { data } = await loginUser(email, password);
    console.log(data);
    if (data) {
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
