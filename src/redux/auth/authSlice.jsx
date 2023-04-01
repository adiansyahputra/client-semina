import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : { token: null, role: null, email: null },
  reducers: {
    userLogin(state, action) {
      return {
        token: action.payload.token,
        role: action.payload.role,
        email: action.payload.email,
      };
    },
    userLogout(state, action) {
      return { token: null, role: null, email: null };
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
