import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import shoppingCartReducer from './slices/shoppingCart';

export default configureStore({
  reducer: {
    user: userReducer,
    shoppingCart: shoppingCartReducer,
  },
});
