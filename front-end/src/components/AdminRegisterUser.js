import React, { useState } from 'react';
import validateEmail from '../utils/validateEmail';

const AdminRegisterUser = () => {
  const [dataUser, setDataUser] = useState(
    { name: '', email: '', password: '', role: 'seller' },
  );
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);

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

  return (
    <form>
      <h2>Cadastrar novo usuário</h2>

      <label htmlFor="name">
        Nome
        <input
          onChange={ handleChange }
          type="text"
          name="name"
          id="name"
          placeholder="Nome (mín. 12 caracteres)"
          data-testid="admin_manage__input-name"
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          onChange={ handleChange }
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          data-testid="admin_manage__input-email"
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          onChange={ handleChange }
          type="password"
          name="password"
          id="password"
          placeholder="Senha (mín. 6 caracteres)"
          data-testid="admin_manage__input-password"
        />
      </label>
      <label htmlFor="role">
        Tipo
        <select
          name="role"
          id="role"
          data-testid="admin_manage__select-role"
          onChange={ handleChange }
        >
          <option value="seller" selected>Vendedor</option>
          <option value="customer">Cliente</option>
          <option value="administrator">Administrador</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={ !isNameValid || !isEmailValid || !isPasswordValid }
        data-testid="admin_manage__button-register"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default AdminRegisterUser;
