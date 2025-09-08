// api.ts
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "http://10.0.0.100:5152/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let message = "Something went wrong";
    let statusCode: number | undefined;

    if (error.response) {
      statusCode = error.response.status;
      // Check if backend returned a message
      const data = error.response.data as any;
      if (data?.message) {
        message = data.message;
      } else if (typeof data === "string") {
        message = data;
      } else {
        message = `Request failed with status ${statusCode}`;
      }
    } else if (error.request) {
      message = "No response from server. Please check your connection.";
    } else {
      message = error.message;
    }

    return Promise.reject({ message, statusCode });
  }
);

export default api;
