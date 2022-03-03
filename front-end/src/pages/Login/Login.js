import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { infoUser } from '../../app/slices/user';
import { loginUser } from '../../api';
import './Login.css';

// adaptado de: https://stackoverflow.com/a/9204568
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [dataUser, setDataUser] = useState({ email: '', password: '' });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUserNotCreated, setIsUserNotCreated] = useState(false);

  const handleChange = ({ target }) => {
    const SIX = 6;
    const targetIsEmail = target.name === 'email';
    const emailIsValid = validateEmail(target.value);
    const targetIsPassword = target.name === 'password';
    const passwordIsValid = target.value.length >= SIX;

    if (targetIsEmail) {
      setIsEmailValid(emailIsValid);
    }

    if (targetIsPassword) {
      setIsPasswordValid(passwordIsValid);
    }

    setDataUser((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (e.target.name === 'cadastrar') {
      history.push('/register');
    }
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    const { email, password } = dataUser;
    const validateLogin = await loginUser(email, password);

    console.log('DATA:', validateLogin);

    if (!validateLogin) return setIsUserNotCreated(true);

    if (validateLogin) {
      const { data } = validateLogin;
      console.log(data);
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
              onChange={ handleChange }
              type="email"
              placeholder="Insira seu email"
              name="email"
              id="email"
              data-testid="common_login__input-email"
            />
          </label>
          <label htmlFor="password">
            <input
              onChange={ handleChange }
              name="password"
              id="password"
              type="password"
              placeholder="Senha"
              data-testid="common_login__input-password"
            />
          </label>
        </form>
        <div>
          <div>
            <button
              onClick={ handleClickLogin }
              disabled={ !isEmailValid || !isPasswordValid }
              name="login"
              type="submit"
              data-testid="common_login__button-login"
            >
              LOGIN
            </button>
          </div>
          <div>
            <button
              onClick={ handleClick }
              name="cadastrar"
              type="submit"
              data-testid="common_login__button-register"
            >
              Ainda não tenho conta
            </button>
          </div>
        </div>
      </div>

      <div
        className={ `${isUserNotCreated ? 'error-message' : 'hided-error-message'}` }
        data-testid="common_login__element-invalid-email"
      >
        <p>Email ou senha inválidos</p>
      </div>
    </main>
  );
};

export default Login;
