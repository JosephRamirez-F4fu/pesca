import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { BoxesProvider } from "../domain/boxes/context";
import { BoxesReturnProvider } from "../domain/boxes_return/context";
import { ControlBoxesProvider } from "../domain/control_boxes/context";
import { BoxesPlaceProvider } from "../domain/boxes-place/context";
import { Box, CircularProgress } from "@mui/material";

const BoxControlPageDetailContent = lazy(() =>
  import("./../pages/control-detail/index").then((module) => ({
    default: module.BoxControlPageDetail,
  }))
);
const BoxControlPageContent = lazy(() =>
  import("./../pages/control/index").then((module) => ({
    default: module.BoxControlPage,
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

export const BoxesModuleLayout = () => {
  return (
    <ControlBoxesProvider>
      <BoxesPlaceProvider>
        <BoxesProvider>
          <BoxesReturnProvider>
            <Outlet />
          </BoxesReturnProvider>
        </BoxesProvider>
      </BoxesPlaceProvider>
    </ControlBoxesProvider>
  );
};

export const BoxControlPage = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <BoxControlPageContent />
    </Suspense>
  );
};

export const BoxControlPageDetail = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <BoxControlPageDetailContent />
    </Suspense>
  );
};
