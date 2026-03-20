import axios, { InternalAxiosRequestConfig } from "axios";
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

const refreshApi = axios.create({
  baseURL: ENV.API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<string | null> | null = null;

const attachAuthHeaders = (
  config: InternalAxiosRequestConfig,
  accessToken = authTokenStorage.getAccessToken(),
  refreshToken = authTokenStorage.getRefreshToken()
) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (refreshToken) {
    config.headers["X-Refresh-Token"] = refreshToken;
  }

  return config;
};

const persistRefreshedAccessToken = (accessTokenHeader: unknown) => {
  const refreshToken = authTokenStorage.getRefreshToken();

  if (
    typeof accessTokenHeader === "string" &&
    accessTokenHeader.trim() &&
    refreshToken
  ) {
    authTokenStorage.setTokens(accessTokenHeader, refreshToken);
    return accessTokenHeader;
  }

  return null;
};

const redirectToLogin = () => {
  if (window.location.pathname !== "/") {
    window.location.href = "/";
  }
};

const refreshAccessToken = async () => {
  const refreshToken = authTokenStorage.getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await refreshApi.get("/auth/session", {
          headers: {
            "X-Refresh-Token": refreshToken,
          },
        });

        return persistRefreshedAccessToken(response.headers["x-access-token"]);
      } catch {
        authTokenStorage.clear();
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
};

api.interceptors.request.use((config) => {
  return attachAuthHeaders(config);
});

api.interceptors.response.use(
  (response) => {
    persistRefreshedAccessToken(response.headers["x-access-token"]);

    return response;
  },
  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const isUnauthorized = error.response?.status === 401;
    const isRefreshRequest = originalRequest?.url === "/auth/session";
    const isAuthLogin = originalRequest?.url === "/auth/login";

    if (!isUnauthorized || !originalRequest || isAuthLogin) {
      return Promise.reject(error);
    }

    if (isRefreshRequest || originalRequest._retry) {
      authTokenStorage.clear();
      redirectToLogin();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshedAccessToken = await refreshAccessToken();

    if (!refreshedAccessToken) {
      redirectToLogin();
      return Promise.reject(error);
    }

    attachAuthHeaders(
      originalRequest,
      refreshedAccessToken,
      authTokenStorage.getRefreshToken()
    );

    return api(originalRequest);
  }
);
