// services/subscriptionService.js
import axios from "axios";

export const fetchSubscriptionStatus = async () => {
  const res = await axios.get("/api/subscription/status", {
    withCredentials: true,
  });
  return res.data;
};