import axios from 'axios';

const URL = 'http://localhost:3001';

export const fetchAllProducts = (token) => axios.get(`${URL}/products`,
  { headers: { authorization: `${token}` } });

export const createUser = (user) => axios.post(`${URL}/users`, user);

export const loginUser = (name, password) => axios.post(`${URL}/login`, { name,
  password });

export const getSellers = (token) => axios.get(`${URL}/users/sellers`, { headers:
  { authorization: `${token}` } });

export const createSale = (sale, token) => axios.post(`${URL}/sales`, sale, { headers:
  { authorization: `${token}` } });

export const fetchAllSales = (token) => axios.get(`${URL}/sales`, { headers:
  { authorization: `${token}` } });

export const fetchSaleById = (id, token) => axios.get(`${URL}/sales/${id}`, { headers:
  { authorization: `${token}` } });
