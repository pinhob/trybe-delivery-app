import React from 'react';

const AdminRegisterUser = () => (
  <form>
    <h2>Cadastrar novo usuário</h2>

    <label htmlFor="name">
      Nome
      <input
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
        type="password"
        name="password"
        id="password"
        placeholder="Senha (mín. 6 caracteres)"
        data-testid="admin_manage__input-password"
      />
    </label>
    <label htmlFor="role">
      Tipo
      <select name="role" id="role" data-testid="admin_manage__select-role">
        <option value="seller" selected>Vendedor</option>
        <option value="customer" selected>Cliente</option>
        <option value="administrator" selected>Administrador</option>
      </select>
    </label>

    <button type="submit" data-testid="admin_manage__button-register">Cadastrar</button>
  </form>
);

export default AdminRegisterUser;
