import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    role: '',
    token: '',
  },
  reducers: {
    infoUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
  },
});
export const { infoUser } = userSlice.actions;
export default userSlice.reducer;
