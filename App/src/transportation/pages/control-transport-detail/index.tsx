import { useEffect, useState } from "react";
import { Box } from "@mui/material";
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
    <Box>
      <DetailHeader
        routeSelected={routeSelected}
        vehicle={vehicle}
        routeDetail={routeDetail}
      />
      <ControlTransportDetailLiquidationSection />
      <ControlTransportDetailOilSection />
    </Box>
  );
};
