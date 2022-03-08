import axios from 'axios';

const URL = 'http://localhost:3001';

export const fetchAllProducts = (token) => axios.get(`${URL}/products`,
  { headers: { authorization: `${token}` } });

export const createUser = (user) => axios.post(`${URL}/users`, user)
  .catch((error) => error.response);

export const adminCreateUser = (user, token) => axios.post(`${URL}/users/admin/create`, user, {
  headers: {
    authorization: `${ token }`
  }
})
  .catch((error) => error.response);

// Catch feito com base em: https://axios-http.com/docs/handling_errors
export const loginUser = (email, password) => axios
  .post(`${URL}/login`, { email, password }, { headers:
    { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
  .catch((error) => error.toJSON());

export const getSellers = (token) => axios.get(`${URL}/users/sellers`, { headers:
  { authorization: `${token}` } });

export const createSale = (sale, token) => axios.post(`${URL}/sales`, sale, { headers:
  { authorization: `${token}` } });

export const fetchAllSales = (token) => axios.get(`${URL}/sales`, { headers:
  { authorization: `${token}` } });

export const fetchSaleById = (id, token) => axios.get(`${URL}/sales/${id}`, { headers:
  { authorization: `${token}` } });
