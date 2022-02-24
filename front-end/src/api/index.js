import axios from 'axios';

const URL = 'http://localhost:3001/products';

const fetchAllProducts = () => axios.get(URL);

export default fetchAllProducts;
