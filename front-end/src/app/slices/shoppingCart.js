import { createSlice } from '@reduxjs/toolkit';

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addQtyItem: (state, action) => {
      console.log(action);
      const quantity = action.payload.product.quantity + 1;
      state.products = Object.values({ ...state.products,
        [action.payload.index]: { ...state.products[action.payload.index], quantity } });
    },
    subQtyItem: (state, action) => {
      const quantity = (action.payload.product.quantity > 0)
        ? action.payload.product.quantity - 1
        : 0;
      state.products = Object.values({ ...state.products,
        [action.payload.index]: { ...state.products[action.payload.index], quantity } });
    },
    changeQtyItem: (state, action) => {
      const quantity = parseInt(action.payload.value, 10) > 0
        ? parseInt(action.payload.value, 10)
        : 0;
      state.products = Object.values({ ...state.products,
        [action.payload.index]: { ...state.products[action.payload.index], quantity } });
    },
  },
});

export const {
  setProducts, addQtyItem, subQtyItem, changeQtyItem,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
