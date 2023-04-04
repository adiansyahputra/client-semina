import { createSlice } from '@reduxjs/toolkit';

const initialState = { status: false, typeNotif: '', message: null };

const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    setNotif(state, action) {
      return {
        status: action.payload.status,
        typeNotif: action.payload.typeNotif,
        message: action.payload.message,
      };
    },
    clearNotif(state, action) {
      return initialState;
    },
  },
});

export const notifActions = notifSlice.actions;

export default notifSlice;
