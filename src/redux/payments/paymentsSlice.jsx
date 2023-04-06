import { createSlice } from '@reduxjs/toolkit';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  data: [],
  keyword: '',
  status: statuslist.idle,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    startFetching(state, action) {
      return { ...state, status: statuslist.process };
    },
    errorFetching(state, action) {
      return { ...state, status: statuslist.error };
    },
    successFetching(state, action) {
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.payments,
      };
    },
  },
});

export const paymentsActions = paymentsSlice.actions;

export default paymentsSlice;
