import { UserSessionDto } from "../domain/dto/user.session.dto";
import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./context";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../domain/dto/login.dto";
import { ContextProviderProps } from "../../shared/types/contextProviderProps";
import axios from "axios";
import { authTokenStorage } from "../storage/tokens";

export const AuthProvider = ({ children }: ContextProviderProps) => {
  const [userSession, setUserSession] = useState<UserSessionDto | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const authService = useMemo(() => new AuthService(), []);

  useEffect(() => {
    const bootstrapSession = async () => {
      const refreshToken = authTokenStorage.getRefreshToken();

      if (!refreshToken) {
        setUserSession(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const session = await authService.getSession();
        setUserSession(session);
        setIsAuthenticated(true);
        setAuthError(null);
      } catch {
        setUserSession(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    void bootstrapSession();
  }, [authService]);

  const login = async (loginDto: LoginDto) => {
    setIsSubmitting(true);
    setAuthError(null);

    try {
      const userSession = await authService.login(loginDto);
      if (userSession.status === 200) {
        authTokenStorage.setTokens(
          userSession.accessToken,
          userSession.refreshToken
        );
        setUserSession(userSession);
        setIsAuthenticated(true);
        setAuthError(null);
      }
    } catch (error) {
      authTokenStorage.clear();
      setUserSession(null);
      setIsAuthenticated(false);
      setAuthError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      authTokenStorage.clear();
    }
    setUserSession(null);
    setIsAuthenticated(false);
    setAuthError(null);
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        clearAuthError,
        userSession,
        isAuthenticated,
        isLoading,
        isSubmitting,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const getAuthErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.message;

    if (typeof responseMessage === "string" && responseMessage.trim()) {
      return responseMessage;
    }

    if (error.response?.status === 401) {
      return "Código o contraseña incorrectos.";
    }

    if (error.code === "ECONNABORTED") {
      return "La solicitud tardó demasiado. Inténtalo nuevamente.";
    }
  }

  return "No se pudo iniciar sesión. Verifica tu conexión e inténtalo otra vez.";
};
