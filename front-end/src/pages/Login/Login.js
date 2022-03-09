import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { infoUser } from '../../app/slices/user';
import { loginUser } from '../../api';
import './Login.css';
import logo from '../../images/logo-vertical.png';

// adaptado de: https://stackoverflow.com/a/9204568
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const infoUsuario = (localStorage.user) ? JSON.parse(localStorage.user) : null;
  const [dataUser, setDataUser] = useState({ email: '', password: '' });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUserNotCreated, setIsUserNotCreated] = useState(false);

  const redirectUser = (role) => {
    switch (role) {
    case 'customer':
      history.push('/customer/products');
      break;
    case 'seller':
      history.push('/seller/orders');
      break;
    case 'administrator':
      history.push('/admin/manage');
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    if (infoUsuario) {
      // switch (infoUsuario.role) {
      // case 'customer':
      //   history.push('/customer/orders');
      //   break;
      // case 'seller':
      //   history.push('/seller/orders');
      //   break;
      // case 'administrator':
      //   history.push('/admin/manage');
      //   break;
      // default:
      //   break;
      // }
      redirectUser(infoUsuario.role);
    }
  }, [infoUsuario]);

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

  const handleClickLogin = async (e) => {
    e.preventDefault();
    const { email, password } = dataUser;
    const validateLogin = await loginUser(email, password);

    console.log(validateLogin);

    if (validateLogin.name === 'Error') return setIsUserNotCreated(true);

    if (validateLogin) {
      const { data } = validateLogin;
      console.log(data);
      dispatch(infoUser(data));
      localStorage.user = JSON.stringify(data);

      redirectUser(data.role);
    }
  };

  return (
    <main className="login-main">
      <img src={ logo } alt="Logo Dona Tereza" />
      <div className="login-body">
        <h1>Faça seu Login</h1>
        <form>
          <label htmlFor="email">
            Email
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
            Senha
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
        <button
          className="login-button primary"
          onClick={ handleClickLogin }
          disabled={ !isEmailValid || !isPasswordValid }
          name="login"
          type="submit"
          data-testid="common_login__button-login"
        >
          LOGIN
        </button>
        <button
          className="login-button secondary"
          onClick={ () => history.push('/register') }
          name="cadastrar"
          type="submit"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
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
