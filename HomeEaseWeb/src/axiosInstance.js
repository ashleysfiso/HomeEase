import axios from "axios";
import { useAuth } from "./contexts/AuthContext";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://localhost:7234/api/",
  withCredentials: true,
});

// Request interceptor: attaches access token from cookies
/*axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);*/

// Response interceptor: handles token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("Auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        console.log("401 error - trying refresh");
        await axiosInstance.post("Auth/refresh");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Optionally redirect to login or clear tokens
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
