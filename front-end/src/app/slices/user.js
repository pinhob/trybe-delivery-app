import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
name: 'user',
initialState: {
    name: '',
    email: '',
    role: 'customer',
    token: '',
},
reducers: {
    infoUser: (state, action) => {
      state = action.payload
    },
}
});