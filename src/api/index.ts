import axios, { AxiosError, type Axios } from "axios";
import { getCookie } from "typescript-cookie";

// Create an Axios instance
const axiosInstance: Axios = axios.create({
  baseURL: "https://weather-auth-app-backend.vercel.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("auth_token"); // Always retrieve the latest token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry and auto-logout
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // const originalRequest = error.config;
    if (error.response?.status === 401) {
      // Remove the token and redirect to login if 401 Unauthorized is encountered
      console.error("Token expired or unauthorized, redirecting to login...");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
