import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import shoppingCartReducer from './slices/shoppingCart';
import sellersReducer from './slices/sellers';

export default configureStore({
  reducer: {
    user: userReducer,
    shoppingCart: shoppingCartReducer,
    sellers: sellersReducer,
  },
});
