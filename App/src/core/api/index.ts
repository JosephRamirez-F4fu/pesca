import axios from "axios";
import { ENV } from "../constant/env";
import { authTokenStorage } from "../../auth/storage/tokens";

export const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = authTokenStorage.getAccessToken();
  const refreshToken = authTokenStorage.getRefreshToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (refreshToken) {
    config.headers["X-Refresh-Token"] = refreshToken;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    const refreshedAccessToken = response.headers["x-access-token"];

    if (
      typeof refreshedAccessToken === "string" &&
      refreshedAccessToken.trim() &&
      authTokenStorage.getRefreshToken()
    ) {
      authTokenStorage.setTokens(
        refreshedAccessToken,
        authTokenStorage.getRefreshToken() ?? ""
      );
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      authTokenStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
