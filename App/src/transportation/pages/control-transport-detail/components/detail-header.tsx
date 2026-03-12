import { Box, Typography } from "@mui/material";
import { VehicleDto } from "../../../dto/vehicle";
import { VehicleRouteDetailResDto } from "../../../dto/vehicle_route_detail";
import { VehicleRouteResDto } from "../../../dto/vehicle-route";
import { formatTransportDate } from "../utils";

interface DetailHeaderProps {
  routeSelected: VehicleRouteResDto;
  vehicle: VehicleDto;
  routeDetail: VehicleRouteDetailResDto;
}

export const DetailHeader = ({
  routeSelected,
  vehicle,
  routeDetail,
}: DetailHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 2,
        padding: 2,
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: 2, fontWeight: "bold", color: "primary.main" }}
      >
        Detalles de Transporte de {vehicle.name} {vehicle.user}{" "}
        {formatTransportDate(routeSelected.createdAt)}
        {routeDetail.point_charge &&
          ` - Punto de Carga: ${routeDetail.point_charge}`}
      </Typography>
    </Box>
  );
};
