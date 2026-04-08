import { api } from "./base";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  },

  register: async (userData: {
    email: string;
    password: string;
    name: string;
  }): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/register", userData);
    return response.data;
  },
};
