import { createSlice } from '@reduxjs/toolkit';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  categories: [],
  statusCategories: statuslist.idle,
  talents: [],
  statusTalents: statuslist.idle,
  events: [],
  statusEvents: statuslist.idle,
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    startFetchingListsCategories(state, action) {
      return { ...state, statusCategories: statuslist.process };
    },
    errorFetchingListsCategories(state, action) {
      return { ...state, statusCategories: statuslist.error };
    },
    successFetchingListsCategories(state, action) {
      return {
        ...state,
        statusCategories: statuslist.success,
        categories: action.payload.categories,
      };
    },
    startFetchingListsTalents(state, action) {
      return { ...state, statusTalents: statuslist.process };
    },
    errorFetchingListsTalents(state, action) {
      return { ...state, statusTalents: statuslist.error };
    },
    successFetchingListsTalents(state, action) {
      return {
        ...state,
        statusTalents: statuslist.success,
        talents: action.payload.talents,
      };
    },
    startFetchingListsEvents(state, action) {
      return { ...state, statusEvents: statuslist.process };
    },
    errorFetchingListsEvents(state, action) {
      return { ...state, statusEvents: statuslist.error };
    },
    successFetchingListsEvents(state, action) {
      return {
        ...state,
        statusEvents: statuslist.success,
        events: action.payload.events,
      };
    },
  },
});

export const listsActions = listsSlice.actions;

export default listsSlice;
