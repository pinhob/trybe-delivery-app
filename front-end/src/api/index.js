import axios from 'axios';

const URL_PRODUCTS = 'http://localhost:3001/products';

const URL_USER = 'http://localhost:3001/users';

export const fetchAllProducts = () => axios.get(URL_PRODUCTS);

export const createUser = (user) => axios.post(URL_USER, user);
