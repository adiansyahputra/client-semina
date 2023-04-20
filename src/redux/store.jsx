import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth/authSlice';
import categoriesSlice from './categories/categoriesSlice';
import notifSlice from './notif/notifSlice';
import talentsSlice from './talents/talentsSlice';
import paymentsSlice from './payments/paymentsSlice';
import eventsSlice from './events/eventsSlice';
import listsSlice from './lists/listsSlice';
import ordersSlice from './orders/ordersSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    categories: categoriesSlice.reducer,
    notif: notifSlice.reducer,
    talents: talentsSlice.reducer,
    payments: paymentsSlice.reducer,
    events: eventsSlice.reducer,
    lists: listsSlice.reducer,
    orders: ordersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
