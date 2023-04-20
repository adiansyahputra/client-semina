import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : { token: null, role: null },
  reducers: {
    userLogin(state, action) {
      return {
        token: action.payload.token,
        role: action.payload.role,
      };
    },
    userLogout(state, action) {
      return { token: null, role: null };
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
