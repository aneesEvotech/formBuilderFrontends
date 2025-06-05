import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import subscriptionReducer from './slices/subscriptionSlice';


export const store = configureStore({
  reducer: {
    auth: authSlice,
    subscription: subscriptionReducer,
  },
});

export default store;