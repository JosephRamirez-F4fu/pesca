import { useRouteDetail } from "../../context/vehicle_route_detail";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { VehicleRouteDetailUseOilDestiny } from "../../dto/vehicle_route_detail";
import { formatIsoDate } from "../../../shared/utils/date";

export const VehicleUseOilDestiny = () => {
  const { VehicleUsegeOilByDestination } = useRouteDetail();
  const [oilUse, setOilUse] = useState<VehicleRouteDetailUseOilDestiny[]>([]);
  const { register, handleSubmit } = useForm<{ destination: string }>();

  const onSubmit = async (data: { destination: string }) => {
    const response = await VehicleUsegeOilByDestination(data.destination);
    setOilUse(response);
  };

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
        <Card
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid",
            borderColor: alpha("#0f3d3e", 0.12),
            boxShadow: "0 28px 80px rgba(10, 33, 34, 0.08)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(249,244,235,0.96) 100%)",
          }}
        >
          <Box
            sx={{
              px: { xs: 2.5, md: 3.25 },
              py: { xs: 2.5, md: 3 },
              background:
                "linear-gradient(135deg, rgba(12,59,61,0.96) 0%, rgba(33,92,94,0.92) 100%)",
              color: "#f7f1e6",
            }}
          >
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={2.5}
              justifyContent="space-between"
            >
              <Stack spacing={1.25} sx={{ maxWidth: 620 }}>
                <Typography
                  variant="overline"
                  sx={{
                    letterSpacing: "0.22em",
                    opacity: 0.76,
                    fontSize: "0.68rem",
                  }}
                >
                  Consulta de petróleo
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.04,
                    fontSize: { xs: "1.85rem", md: "2.4rem" },
                  }}
                >
                  Búsqueda de consumo por destino
                </Typography>
                <Typography
                  sx={{ color: alpha("#f7f1e6", 0.84), maxWidth: 560 }}
                >
                  Identifica rápidamente cuánto combustible se usó por destino y
                  en qué unidad se registró.
                </Typography>
              </Stack>
              <Chip
                label={`${oilUse.length} resultados`}
                sx={{
                  bgcolor: alpha("#f7f1e6", 0.14),
                  color: "#f7f1e6",
                  borderRadius: 99,
                  alignSelf: "flex-start",
                }}
              />
            </Stack>
          </Box>

          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <Stack spacing={2.5}>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <TextField
                  {...register("destination")}
                  label="Destino"
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2.5,
                      backgroundColor: alpha("#ffffff", 0.92),
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 99, minWidth: 130 }}
                >
                  Buscar
                </Button>
              </Box>

              {oilUse.length === 0 ? (
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3.5,
                    bgcolor: alpha("#0f3d3e", 0.04),
                    boxShadow: "none",
                  }}
                >
                  <Typography sx={{ fontWeight: 700 }}>
                    No se encontró información.
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                    Ingresa un destino para revisar el historial de consumo
                    registrado.
                  </Typography>
                </Card>
              ) : (
                <TableContainer
                  component={Paper}
                  sx={{
                    borderRadius: 3.5,
                    border: "1px solid",
                    borderColor: alpha("#0f3d3e", 0.08),
                    boxShadow: "0 18px 50px rgba(10, 33, 34, 0.06)",
                    overflow: "hidden",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: alpha("#0f3d3e", 0.05) }}>
                        <TableCell>Fecha Salida</TableCell>
                        <TableCell>Vehiculo</TableCell>
                        <TableCell>Destino</TableCell>
                        <TableCell>Petroleo Usado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {oilUse.map((oil, index) => (
                        <TableRow key={index} hover>
                          <TableCell>{formatIsoDate(oil.dateInit)}</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>
                            {oil.vehicle}
                          </TableCell>
                          <TableCell>{oil.point_charge}</TableCell>
                          <TableCell>{oil.vehicle_route_oil_usage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
