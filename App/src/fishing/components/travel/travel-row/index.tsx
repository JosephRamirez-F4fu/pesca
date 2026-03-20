import {
  alpha,
  Chip,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { travelResDto } from "./../../../domain/dto/travel.dto";

export interface TravelRowProps {
  travel: travelResDto;
  goToDetail: (travel: travelResDto) => void;
  dateFormater: (date: string) => string;
}

export const TravelRow = ({
  travel,
  goToDetail,
  dateFormater,
}: TravelRowProps) => {
  const statuses = [
    { label: "Tripulacion", canceled: Boolean(travel.fishing_date_canceled) },
    { label: "Lancha", canceled: Boolean(travel.oil_date_canceled) },
    {
      label: "Estibadores",
      canceled: Boolean(travel.charger_operation.date_canceled),
    },
    { label: "Vehiculo", canceled: Boolean(travel.oil_vehicle_date_canceled) },
  ];

  return (
    <TableRow
      key={travel.id}
      hover
      tabIndex={0}
      role="link"
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        backgroundColor: alpha("#ffffff", 0.72),
        transition:
          "transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
        ":hover": {
          backgroundColor: "#fffdf8",
          boxShadow: `inset 4px 0 0 ${alpha("#0f3d3e", 0.9)}`,
        },
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: "-2px",
        },
      }}
      onClick={() => goToDetail(travel)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          goToDetail(travel);
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <TableCell component="th" scope="row" sx={{ py: 2.25 }}>
        <Stack spacing={0.5}>
          <Typography sx={{ fontWeight: 800 }}>{travel.code}</Typography>
          <Typography variant="body2" color="text.secondary">
            Viaje #{travel.id}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>{dateFormater(travel.createdAt)}</TableCell>
      {statuses.map((status) => (
        <TableCell key={status.label}>
          <Chip
            label={status.canceled ? "Cancelado" : "No Cancelado"}
            size="small"
            sx={{
              minWidth: 122,
              borderRadius: 99,
              fontWeight: 700,
              bgcolor: status.canceled
                ? alpha("#a14d38", 0.12)
                : alpha("#6c7d78", 0.14),
              color: status.canceled ? "#8e4d2c" : "#566661",
            }}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};
