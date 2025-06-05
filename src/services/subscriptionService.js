import axios from "axios";
import { base_urlLink } from "../components/helper/config";
import { handleRequest } from "../components/helper/api";

const AUTH_URL = `${base_urlLink}/api/subscriptions`;

axios.defaults.withCredentials = true;

const authApi = axios.create({
  baseURL: AUTH_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createCheckoutSession = async (pyaload) => {
  return handleRequest(authApi.post("/create-checkout-session", pyaload));
};

export const getSubscriptionStatus = async () => {
  return handleRequest(authApi.get("/status"));
};

export const checkFeature = async () => {
  return handleRequest(authApi.get("/feature/:featureKey"));
};

export const getplans = async () => {
  return handleRequest(authApi.get("/getplans"));
};
