import axios from "axios";
import { useInitialSetUpStore } from "@/store/initialSetUp";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const userLoginData = useInitialSetUpStore.getState().userLoginData;
    if (userLoginData?.access_token) {
      config.headers.Authorization = `Bearer ${userLoginData.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { setUserLoginData } = useInitialSetUpStore.getState();
      setUserLoginData("");
      window.location.href = "/signIn";
    }
    return Promise.reject(error);
  },
);
