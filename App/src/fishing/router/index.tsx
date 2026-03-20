import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { TravelProvider } from "../context/travel";
import { OtherCostTravelProvider } from "../context/other-cost";
import { FishingProvider } from "../context/fishing";
import { ChargerOperationProvider } from "../context/charger-operation";
import { BoatProvider } from "../context/boat";
import { TankPriceProvider } from "../context/tank-price/provider";
import { Box, CircularProgress } from "@mui/material";

const TravelPageContent = lazy(() =>
  import("../pages/travel/show").then((module) => ({
    default: module.TravelPage,
  }))
);
const TravelDetailPageContent = lazy(() =>
  import("../pages/travel/detail").then((module) => ({
    default: module.TravelDetailPage,
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

export const FishingModuleLayout = () => {
  return (
    <BoatProvider>
      <TankPriceProvider>
        <TravelProvider>
          <OtherCostTravelProvider>
            <FishingProvider>
              <ChargerOperationProvider>
                <Outlet />
              </ChargerOperationProvider>
            </FishingProvider>
          </OtherCostTravelProvider>
        </TravelProvider>
      </TankPriceProvider>
    </BoatProvider>
  );
};

export const TravelPage = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <TravelPageContent />
    </Suspense>
  );
};

export const TravelDetailPage = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <TravelDetailPageContent />
    </Suspense>
  );
};
