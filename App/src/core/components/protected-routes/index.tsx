import { Outlet, Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../../../auth/context/useContext";
import { Navbar } from "../../../shared/components/Navbar";
import { FullscreenState } from "../../../shared/components/fullscreen-state";
import { APP_ROUTES, HIDE_NAVBAR_ROUTES } from "../../router/paths";

export interface ProtectedRoutesProps {
  children?: ReactNode;
}

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const showNavbar = !HIDE_NAVBAR_ROUTES.has(location.pathname);

  if (isLoading) {
    return (
      <FullscreenState
        loading
        title="Validando sesión"
        description="Estamos comprobando tus credenciales activas."
      />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={APP_ROUTES.login} replace state={{ from: location }} />;
  }

  return children ? (
    children
  ) : (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
    </>
  );
};
