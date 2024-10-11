import axios from "axios";
import { getCookie, removeCookie } from "typescript-cookie"; // Importing from typescript-cookie

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://weather-auth-app-backend.vercel.app/api/", // Replace with your API base URL
  timeout: 10000, // Optional: Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    // Ensure headers object exists
    config.headers = config.headers ?? {};

    // Get the token from cookies using typescript-cookie
    const token = getCookie("auth_token"); // Replace 'auth_token' with your cookie name

    // If the token exists, attach it to the request headers
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it
    return response;
  },
  (error) => {
    // If the error status is 401 (Unauthorized), handle token expiration
    if (error.response?.status === 401) {
      // Optionally, clear cookies or redirect to login
      removeCookie("auth_token"); // Remove token from cookies
      window.location.href = "/auth/login"; // Redirect to login page
    }

    // For other error statuses, return the error response
    return Promise.reject(error);
  }
);

export default axiosInstance;
