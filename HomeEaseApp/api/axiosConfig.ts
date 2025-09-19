// api.ts
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const api = axios.create({
  baseURL: "http://10.0.0.100:5152/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

let inMemoryToken: string | null = null;

export async function setAxiosToken(token: string) {
  inMemoryToken = token;
  await SecureStore.setItemAsync("accessToken", token);
}

export async function clearAxiosToken() {
  inMemoryToken = null;
  await SecureStore.deleteItemAsync("accessToken");
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401 && !error.config?._retry) {
      const originalRequest = error.config!;
      (originalRequest as any)._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        console.log("Refreshing...");
        try {
          const refreshToken = await SecureStore.getItemAsync("refreshToken");
          console.log(`RefreshToken: ${refreshToken}`);
          const res = await axios.post(
            "http://10.0.0.100:5152/api/auth/mobile/refresh",
            {
              refreshToken: refreshToken,
            }
          );

          const newToken = res.data.accessToken;
          await SecureStore.setItemAsync("refreshToken", res.data.refreshToken);
          await setAxiosToken(newToken);

          isRefreshing = false;
          onRefreshed(newToken);

          return api(originalRequest);
        } catch (err) {
          isRefreshing = false;
          await clearAxiosToken();
          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push((token: string) => {
          originalRequest.headers.Authorization = "Bearer " + token;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

// Add token automatically
api.interceptors.request.use(async (config) => {
  if (inMemoryToken) {
    config.headers.Authorization = `Bearer ${inMemoryToken}`;
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
