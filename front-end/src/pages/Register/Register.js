import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { infoUser } from '../../app/slices/user';
import { createUser } from '../../api';
import './Register.css';
import logo from '../../images/logo-vertical.png';

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [dataUser, setDataUser] = useState({ email: '', password: '' });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isUserAlreadyCreated, setIsUserAlreadyCreated] = useState(false);

  const handleChange = ({ target }) => {
    const SIX = 6;
    const TWELVE = 12;
    const targetIsEmail = target.name === 'email';
    const emailIsValid = validateEmail(target.value);
    const targetIsPassword = target.name === 'password';
    const passwordIsValid = target.value.length >= SIX;
    const targetIsName = target.name === 'name';
    const nameIsValid = target.value.length >= TWELVE;

    setDataUser((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));

    if (targetIsEmail) {
      setIsEmailValid(emailIsValid);
    }

    if (targetIsPassword) {
      setIsPasswordValid(passwordIsValid);
    }

    if (targetIsName) {
      setIsNameValid(nameIsValid);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const CONFLICT_STATUS = 409;
    const CREATED_STATUS = 201;

    const user = await createUser(dataUser);
    const { data, status } = user;

    console.log(user);

    if (status === CONFLICT_STATUS) {
      setIsUserAlreadyCreated(true);
    }

    if (status === CREATED_STATUS) {
      setIsUserAlreadyCreated(false);
      dispatch(infoUser(data));
      localStorage.user = JSON.stringify(data);
      history.push('/customer/products');
    }
  };

  return (
    <main className="login-main">
      <img src={ logo } alt="Logo Dona Tereza" />
      <div className="login-body">
        <h1>Faça seu Cadastro</h1>
        <form>
          <label htmlFor="name">
            Nome
            <input
              onChange={ handleChange }
              type="name"
              placeholder="Nome (pelo menos 12 caracteres)"
              name="name"
              id="name"
              data-testid="common_register__input-name"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              onChange={ handleChange }
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              data-testid="common_register__input-email"
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
              data-testid="common_register__input-password"
            />
          </label>
        </form>
        <button
          className="login-button primary"
          disabled={ !isNameValid || !isEmailValid || !isPasswordValid }
          onClick={ handleClick }
          type="submit"
          data-testid="common_register__button-register"
        >
          Cadastrar
        </button>
      </div>
      <div
        className={ `${isUserAlreadyCreated ? 'error-message' : 'hided-error-message'}` }
        data-testid="common_register__element-invalid_register"
      >
        <p>Email ou nome já registrados</p>
      </div>
    </main>
  );
};

export default Register;
