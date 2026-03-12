import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { travelResDto } from "../../../../domain/dto/travel.dto";
import { TankPriceControl } from "../../../../components/tank-price/tank-price-control";
import { formatToDisplayDate } from "../utils";

interface TravelHeaderProps {
  travel: travelResDto;
  onDeleteClick: () => void;
}

export const TravelHeader = ({ travel, onDeleteClick }: TravelHeaderProps) => {
  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: { xs: 96, md: 108 },
          zIndex: (theme) => theme.zIndex.appBar - 1,
          bgcolor: "rgba(248,245,239,0.92)",
          backdropFilter: "blur(14px)",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          boxShadow: "0 10px 20px rgba(16, 42, 67, 0.05)",
          px: { xs: 2, sm: 2.25, md: 2.5 },
          py: { xs: 1.1, md: 1.25 },
          mt: { xs: 0.5, md: 1 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Stack spacing={0.35}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.55rem", md: "1.8rem" },
                lineHeight: 1.1,
              }}
            >
              Viaje {travel.code}
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 0.2, sm: 1.5 }}
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              <Typography variant="body2" sx={{ fontSize: { xs: "1rem", md: "1.08rem" } }}>
                Lancha: {travel.boat?.name || "No asignada"}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: "1rem", md: "1.08rem" } }}>
                Fecha: {formatToDisplayDate(travel.createdAt)}
              </Typography>
            </Stack>
          </Stack>
          <Chip
            size="small"
            label={travel.is_concluded ? "Concluido" : "En curso"}
            color={travel.is_concluded ? "success" : "warning"}
            variant="filled"
            sx={{ height: 28, fontWeight: 700 }}
          />
        </Stack>
      </Box>

      <Stack
        direction={{ xs: "column", xl: "row" }}
        spacing={1.5}
        alignItems="stretch"
        sx={{ mt: 1.25 }}
      >
        <Box sx={{ flex: { xl: "0 0 320px" }, maxWidth: { xl: 320 }, minWidth: 0 }}>
          <TankPriceControl compact />
        </Box>
        <Stack
          sx={{ flex: 1 }}
          justifyContent="flex-end"
          alignItems={{ xs: "stretch", xl: "flex-end" }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={onDeleteClick}
            sx={{ minHeight: 48, px: 3, borderRadius: 99 }}
          >
            Eliminar
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
