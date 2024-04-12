import axios from "axios";
import { BASE_BACKEND_URL } from "../global-const";
// create instance
const axiosInstance = axios.create({
  baseURL: BASE_BACKEND_URL,
});

// Add a request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // Check if access token is present in localStorage
      const accessToken = localStorage.getItem("blog_token");

      // If access token is present, add Authorization header
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
