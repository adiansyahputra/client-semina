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
  talent: '',
  category: '',
  status: statuslist.idle,
};

const eventsSlice = createSlice({
  name: 'events',
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
        data: action.payload.events,
      };
    },
    setKeyword(state, action) {
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    },
    setCategory(state, action) {
      return {
        ...state,
        category: action.payload.category,
      };
    },
    setTalent(state, action) {
      return {
        ...state,
        talent: action.payload.talent,
      };
    },
  },
});

export const eventsActions = eventsSlice.actions;

export default eventsSlice;
