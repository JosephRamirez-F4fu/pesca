import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

const SalesMainContent = lazy(() =>
  import("../pages/main").then((module) => ({
    default: module.SalesMain,
  }))
);
const SalesDriversContent = lazy(() =>
  import("../pages/drivers").then((module) => ({
    default: module.SalesDriversPage,
  }))
);
const SalesVehiclesContent = lazy(() =>
  import("../pages/vehicles").then((module) => ({
    default: module.SalesVehiclesPage,
  }))
);
const SalesProductsContent = lazy(() =>
  import("../pages/products").then((module) => ({
    default: module.SalesProductsPage,
  }))
);
const SalesBalancesContent = lazy(() =>
  import("../pages/balances").then((module) => ({
    default: module.SalesBalancesPage,
  }))
);
const SalesBalanceDetailContent = lazy(() =>
  import("../pages/balance-detail").then((module) => ({
    default: module.SalesBalanceDetailPage,
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

export const SalesMain = () => (
  <Suspense fallback={<RouteLoader />}>
    <SalesMainContent />
  </Suspense>
);

export const SalesDriversPage = () => (
  <Suspense fallback={<RouteLoader />}>
    <SalesDriversContent />
  </Suspense>
);

export const SalesVehiclesPage = () => (
  <Suspense fallback={<RouteLoader />}>
    <SalesVehiclesContent />
  </Suspense>
);

export const SalesProductsPage = () => (
  <Suspense fallback={<RouteLoader />}>
    <SalesProductsContent />
  </Suspense>
);

export const SalesBalancesPage = () => (
  <Suspense fallback={<RouteLoader />}>
    <SalesBalancesContent />
  </Suspense>
);

export const SalesBalanceDetailPage = () => (
  <Suspense fallback={<RouteLoader />}>
    <SalesBalanceDetailContent />
  </Suspense>
);
