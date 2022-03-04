import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { infoUser } from '../../app/slices/user';
import { createUser } from '../../api';
import './Register.css';

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
  const [isUserNotCreated, setIsUserNotCreated] = useState(false);

  const handleChange = ({ target }) => {
    const SIX = 6;
    const TWELVE = 12;
    const targetIsEmail = target.name === 'email';
    const emailIsValid = validateEmail(target.value);
    const targetIsPassword = target.name === 'password';
    const passwordIsValid = target.value.length >= SIX;
    const targetIsName = target.name === 'name';
    const nameIsValid = target.value.length >= TWELVE;

    console.log(dataUser);

    console.log('name', isNameValid, 'email', isEmailValid, 'pass', isPasswordValid);

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

    const { data } = await createUser(dataUser);
    console.log(data);
    if (data) {
      dispatch(infoUser(data));
      localStorage.user = JSON.stringify(data);
      history.push('/customer/products');
    }
  };

  return (
    <main>
      <div>
        Faça seu Cadastro
      </div>
      <form>
        <label htmlFor="name">
          <input
            onChange={ handleChange }
            type="name"
            placeholder="name"
            name="name"
            id="name"
            data-testid="common_register__input-name"
          />
        </label>
        <label htmlFor="email">
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
        <div>
          <button
            disabled={ !isNameValid || !isEmailValid || !isPasswordValid  }
            onClick={ handleClick }
            type="submit"
            data-testid="common_register__button-register"
          >Cadastrar</button>
        </div>

      <div
        className={ `${isUserNotCreated ? 'error-message' : 'hided-error-message'}` }
        data-testid=" common_register__element-invalid_register"
      >
        <p>Campos inválidos</p>
      </div>
    </main>
  );
};

export default Register;
