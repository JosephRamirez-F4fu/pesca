import { useEffect, useState } from "react";
import { Box, alpha, Stack } from "@mui/material";
import { useRouteDetail } from "../../context/vehicle_route_detail";
import { useVehicleRoute } from "../../context/vehicle-route";
import { useVehicle } from "../../context/transportist";
import { VehicleDto } from "../../dto/vehicle";
import { DetailHeader } from "./components/detail-header";
import { ControlTransportDetailLiquidationSection } from "./sections/liquidation-section";
import { ControlTransportDetailOilSection } from "./sections/oil-section";

export const ControlTransportDetail = () => {
  const { routeSelected } = useVehicleRoute();
  const { vehicles } = useVehicle();
  const { routeDetail } = useRouteDetail();
  const [vehicle, setVehicle] = useState<VehicleDto | null>(null);

  useEffect(() => {
    if (!routeSelected || !vehicles) return;

    const nextVehicle = vehicles.find(
      (currentVehicle) => currentVehicle.id === routeSelected.id_vehicle
    );

    setVehicle(nextVehicle || null);
  }, [routeSelected, vehicles]);

  if (!routeSelected || !vehicle || !routeDetail) {
    return null;
  }

  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 2.5, md: 4, lg: 5 },
        py: { xs: 2, sm: 2.5, md: 4 },
        minHeight: "100%",
        background:
          "radial-gradient(circle at top right, rgba(198, 164, 104, 0.2) 0, rgba(198, 164, 104, 0) 26%), linear-gradient(180deg, #f7f2e9 0%, #f1ebdf 48%, #f8f5ef 100%)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", lg: 1180, xl: 1240 },
          mx: "auto",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            "& .MuiCard-root": {
              borderRadius: 3.5,
              border: "1px solid",
              borderColor: alpha("#0f3d3e", 0.08),
              boxShadow: "0 18px 50px rgba(10, 33, 34, 0.06)",
            },
          }}
        >
          <DetailHeader
            routeSelected={routeSelected}
            vehicle={vehicle}
            routeDetail={routeDetail}
          />
          <ControlTransportDetailLiquidationSection />
          <ControlTransportDetailOilSection />
        </Stack>
      </Box>
    </Box>
  );
};
