import React from 'react'
import { useHistory } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.name);

    if (e.target.name === 'cadastrar') {
      history.push('/cadastro')
    }
  };

  return (
    <main>
      <div>
        <div>
          Faça seu Login
        </div>
        <form>
          <label htmlFor='email' >
            <input
                type="email"
                placeholder="Email"
                name="email"
                id='email'
              />
          </label>
          <label>
            <input
              type="password"
              placeholder="Senha"
            />
          </label>
        </form>
        <div>
          <div>
            <button onClick={ handleClick } name='login' type='submit'>LOGIN</button>
          </div>
          <div>
            <button onClick={ handleClick } name='cadastrar' type='submit'>Ainda não tenho conta</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login;
