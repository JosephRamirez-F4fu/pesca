import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { VehicleProvider } from "../context/transportist";
import { RoutesProvider } from "../context/routes";
import { VehicleRouteProvider } from "../context/vehicle-route";
import { VehicleRoutesProvider } from "../context/vehicle-routes";
import { RoutesBalanceProvider } from "../context/vehicle_route_balance";
import { RoutesDetailProvider } from "../context/vehicle_route_detail";
import { RoutesMoneyProvider } from "../context/vehicle_route_money";
import { RoutesOilUseProvider } from "../context/vehicle_routes_oil_use";
import { VehicleRouteOtherCostProvider } from "../context/other-cost";
import { Box, CircularProgress } from "@mui/material";

const MainTransportationContent = lazy(() =>
  import("./../pages/main/index").then((module) => ({
    default: module.MainTransportation,
  }))
);
const TransportistShowContent = lazy(() =>
  import("./../pages/transportist").then((module) => ({
    default: module.TransportistShow,
  }))
);
const RoutesShowContent = lazy(() =>
  import("./../pages/routes").then((module) => ({
    default: module.RoutesShow,
  }))
);
const ControlTransportContent = lazy(() =>
  import("../pages/control-transport").then((module) => ({
    default: module.ControlTransport,
  }))
);
const ControlTransportDetailContent = lazy(() =>
  import("../pages/control-transport-detail").then((module) => ({
    default: module.ControlTransportDetail,
  }))
);
const VehicleUseOilDestinyContent = lazy(() =>
  import("../pages/control-transport-oil-destiny").then((module) => ({
    default: module.VehicleUseOilDestiny,
  }))
);

const RouteLoader = () => (
  <Box
    sx={{
      minHeight: "50vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress />
  </Box>
);

export const TransportationControlLayout = () => {
  return (
    <VehicleProvider>
      <VehicleRouteProvider>
        <RoutesProvider>
          <VehicleRoutesProvider>
            <RoutesBalanceProvider>
              <RoutesDetailProvider>
                <RoutesMoneyProvider>
                  <RoutesOilUseProvider>
                    <VehicleRouteOtherCostProvider>
                      <Outlet />
                    </VehicleRouteOtherCostProvider>
                  </RoutesOilUseProvider>
                </RoutesMoneyProvider>
              </RoutesDetailProvider>
            </RoutesBalanceProvider>
          </VehicleRoutesProvider>
        </RoutesProvider>
      </VehicleRouteProvider>
    </VehicleProvider>
  );
};

export const MainTransportation = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <MainTransportationContent />
    </Suspense>
  );
};

export const TransportistShow = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <VehicleProvider>
        <TransportistShowContent />
      </VehicleProvider>
    </Suspense>
  );
};

export const RoutesShow = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <RoutesProvider>
        <RoutesShowContent />
      </RoutesProvider>
    </Suspense>
  );
};

export const ControlTransport = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <ControlTransportContent />
    </Suspense>
  );
};

export const ControlTransportDetail = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <ControlTransportDetailContent />
    </Suspense>
  );
};

export const VehicleUseOilDestiny = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <VehicleUseOilDestinyContent />
    </Suspense>
  );
};
