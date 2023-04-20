import { createSlice } from '@reduxjs/toolkit';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  data: [],
  page: 1,
  limit: 1,
  pages: 1,
  date: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
  status: statuslist.idle,
};

const ordersSlice = createSlice({
  name: 'orders',
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
        data: action.payload.orders,
        pages: action.payload.pages,
      };
    },
    setPage(state, action) {
      return {
        ...state,
        page: action.payload.page,
      };
    },
    setDate(state, action) {
      return {
        ...state,
        date: action.payload.ranges,
      };
    },
  },
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice;
