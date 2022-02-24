import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../slices/produtos';

export default configureStore({
  reducer: { products: productReducer },
});
