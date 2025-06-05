import axios from "axios";
import { handleRequest } from "helpers/api";

const AUTH_URL = `${process.env.REACT_APP_API_URL}/auth`;

axios.defaults.withCredentials = true;

const authApi = axios.create({
  baseURL: AUTH_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (user) => {
  return handleRequest(authApi.post("/login", user));
};

export const registerUser = async (user) => {
  return handleRequest(authApi.post("/register", user));
};

export const logoutUser = async () => {
  return handleRequest(authApi.get("/logout"));
};