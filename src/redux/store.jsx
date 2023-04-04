import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth/authSlice';
import categoriesSlice from './categories/categoriesSlice';
import notifSlice from './notif/notifSlice';
import talentsSlice from './talents/talentsSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    categories: categoriesSlice.reducer,
    notif: notifSlice.reducer,
    talents: talentsSlice.reducer,
  },
});

export default store;
