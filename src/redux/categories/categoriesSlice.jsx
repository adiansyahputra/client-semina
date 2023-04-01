import { createSlice } from '@reduxjs/toolkit';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    data: [],
    status: statuslist.idle,
  },
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
        data: action.payload.categories,
      };
    },
  },
});

export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice;
