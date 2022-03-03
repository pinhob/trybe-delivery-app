import axios from 'axios';

const URL = 'http://localhost:3001';

export const fetchAllProducts = (token) => axios.get(`${URL}/products`,
  { headers: { authorization: `${token}` } });

export const createUser = (user) => axios.post(`${URL}/users`, user);

export const loginUser = (name, password) => axios.post(`${URL}/login`, { name,
  password });
