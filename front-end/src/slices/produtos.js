import { createSlice } from '@reduxjs/toolkit';
import fetchAllProducts from '../api';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    allProdutcs: [],
  },
  reducers: {
    fetchAll: async (state) => {
      state.allProdutcs = await fetchAllProducts();
    },
  },
});

export const { fetchAll } = productsSlice.actions;

export default productsSlice.reducer;
