import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plan: "freemium", // or "premium", "pro", etc.
  status: "inactive", // or "active", "canceled", etc.
  startDate: null,
  endDate: null,
  stripeCustomerId: null,
  stripeSubscriptionId: null,
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setSubscription: (state, action) => {
      Object.assign(state, { ...initialState, ...action.payload, loading: false });
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearSubscription: () => initialState,
    updateSubscriptionStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  setLoading,
  setSubscription,
  clearSubscription,
  updateSubscriptionStatus,
  setError,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;