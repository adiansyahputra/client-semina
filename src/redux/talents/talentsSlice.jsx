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

const talentsSlice = createSlice({
  name: 'talents',
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
        data: action.payload.talents,
      };
    },
    setKeyword(state, action) {
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    },
  },
});

export const talentsActions = talentsSlice.actions;

export default talentsSlice;
