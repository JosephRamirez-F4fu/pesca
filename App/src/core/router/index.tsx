import { lazy, Suspense } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { ProtectedRoutes } from "../components/protected-routes";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { Button } from "@mui/material";
import { FullscreenState } from "../../shared/components/fullscreen-state";
import { Link as RouterLink } from "react-router-dom";
import { APP_ROUTES } from "./paths";
import {
  FishingModuleLayout,
  TravelDetailPage,
  TravelPage,
} from "../../fishing/router";
import {
  ControlTransport,
  ControlTransportDetail,
  MainTransportation,
  RoutesShow,
  TransportationControlLayout,
  TransportistShow,
  VehicleUseOilDestiny,
} from "../../transportation/router";
import {
  SalesBalanceDetailPage,
  SalesBalancesPage,
  SalesDriversPage,
  SalesMain,
  SalesProductsPage,
  SalesVehiclesPage,
} from "../../sales/router";

const Login = lazy(() =>
  import("../../auth/pages/login").then((module) => ({
    default: module.Login,
  }))
);
const Home = lazy(() =>
  import("../../home/pages/home").then((module) => ({
    default: module.Home,
  }))
);
const PendingPage = ({ title }: { title: string }) => (
  <FullscreenState
    title={title}
    description="Este módulo sigue pendiente. La navegación ya está preparada para incorporarlo sin romper el resto de la aplicación."
    icon={<PendingActionsIcon color="primary" sx={{ fontSize: 44 }} />}
    action={
      <Button component={RouterLink} to={APP_ROUTES.home} variant="contained">
        Volver al inicio
      </Button>
    }
  />
);

const RouteLoader = () => (
  <FullscreenState
    loading
    title="Cargando módulo"
    description="Estamos preparando la siguiente vista."
  />
);

export const AppRouter = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path={APP_ROUTES.login} element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="inicio" element={<Home />} />

          <Route path="pesca" element={<FishingModuleLayout />}>
            <Route index element={<TravelPage />} />
            <Route path="viaje/:id" element={<TravelDetailPage />} />
            <Route
              path="*"
              element={<Navigate to={APP_ROUTES.fishing} replace />}
            />
          </Route>

          <Route path="transporte" element={<Outlet />}>
            <Route index element={<MainTransportation />} />
            <Route path="rutas" element={<RoutesShow />} />
            <Route path="choferes" element={<TransportistShow />} />
            <Route path="control" element={<TransportationControlLayout />}>
              <Route index element={<ControlTransport />} />
              <Route
                path="petroleo-destino"
                element={<VehicleUseOilDestiny />}
              />
              <Route path=":id" element={<ControlTransportDetail />} />
            </Route>
            <Route
              path="*"
              element={<Navigate to={APP_ROUTES.transportation} replace />}
            />
          </Route>

          <Route path="ventas" element={<Outlet />}>
            <Route index element={<SalesMain />} />
            <Route path="choferes" element={<SalesDriversPage />} />
            <Route path="vehiculos" element={<SalesVehiclesPage />} />
            <Route path="productos" element={<SalesProductsPage />} />
            <Route path="cuadres" element={<SalesBalancesPage />} />
            <Route path="cuadres/:id" element={<SalesBalanceDetailPage />} />
            <Route path="*" element={<Navigate to={APP_ROUTES.sales} replace />} />
          </Route>

          <Route
            path="reportes/*"
            element={<PendingPage title="Reportes" />}
          />
          <Route
            path="balanza-gastos/*"
            element={<PendingPage title="Balanza de gastos" />}
          />
          <Route path="*" element={<Navigate to={APP_ROUTES.home} replace />} />
        </Route>
        <Route path="*" element={<Navigate to={APP_ROUTES.login} replace />} />
      </Routes>
    </Suspense>
  );
};
