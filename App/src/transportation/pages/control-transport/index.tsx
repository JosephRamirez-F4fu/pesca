import { useVehicleRoute } from "../../context/vehicle-route";
import { useLocation, useNavigate } from "react-router-dom";
import { VehicleRouteDto, VehicleRouteResDto } from "../../dto/vehicle-route";
import { useState } from "react";
import {
  alpha,
  TextField,
  Button as MuiButton,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useVehicle } from "../../context/transportist";
import {
  formatIsoDate,
  formatIsoDateForInput,
  toIsoDateString,
} from "../../../shared/utils/date";

const primarySoftButtonSx = {
  borderRadius: 99,
  minHeight: 42,
  px: 2.2,
  color: "#0f3d3e",
  backgroundColor: alpha("#0f7d79", 0.1),
  border: "1px solid rgba(15, 125, 121, 0.12)",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: alpha("#0f7d79", 0.16),
    boxShadow: "none",
  },
};

const subtleOutlinedButtonSx = {
  borderRadius: 99,
  minHeight: 36,
  px: 1.7,
  borderColor: alpha("#0f3d3e", 0.12),
  color: "#0f3d3e",
  backgroundColor: alpha("#ffffff", 0.65),
  "&:hover": {
    borderColor: alpha("#0f3d3e", 0.2),
    backgroundColor: alpha("#ffffff", 0.92),
  },
};

const dangerOutlinedButtonSx = {
  ...subtleOutlinedButtonSx,
  borderColor: alpha("#8e4d2c", 0.18),
  color: "#8e4d2c",
  "&:hover": {
    borderColor: alpha("#8e4d2c", 0.28),
    backgroundColor: alpha("#8e4d2c", 0.06),
  },
};

interface ControlTransportFormProps {
  createRoute: (route: VehicleRouteDto) => void;
  updateRoute: (id: number, route: VehicleRouteDto) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  idRoute: number;
  setIdRoute: (id: number) => void;
  newRoute: VehicleRouteDto;
  setNewRoute: (route: VehicleRouteDto) => void;
}

export const ControlTransportForm = ({
  createRoute,
  updateRoute,
  isEditing,
  setIsEditing,
  idRoute,
  newRoute,
  setNewRoute,
}: ControlTransportFormProps) => {
  const { vehicles } = useVehicle();

  const handleCreateRoute = () => {
    createRoute({
      ...newRoute,
      createdAt: toIsoDateString(newRoute.createdAt) ?? "",
    });
    resetNewRoute();
  };

  const sendUpdateRoute = async (nextRoute: VehicleRouteDto) => {
    await updateRoute(idRoute, {
      ...nextRoute,
      createdAt: toIsoDateString(nextRoute.createdAt) ?? "",
    });
    setIsEditing(false);
    resetNewRoute();
  };

  const resetNewRoute = () => {
    setNewRoute({
      createdAt: "",
      id_vehicle: 0,
      state: "NO ENTREGADO",
      is_concluded: "NO",
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="vehicle-select-label">Vehiculo</InputLabel>
        <Select
          labelId="vehicle-select-label"
          label="Vehiculo"
          value={newRoute.id_vehicle === 0 ? "" : newRoute.id_vehicle}
          onChange={(e) =>
            setNewRoute({ ...newRoute, id_vehicle: e.target.value as number })
          }
          sx={{ borderRadius: 2.5, backgroundColor: alpha("#ffffff", 0.92) }}
        >
          {vehicles
            .filter((vehicle) => vehicle.is_active)
            .map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        label="Fecha"
        value={newRoute.createdAt || ""}
        type="date"
        onChange={(e) =>
          setNewRoute({ ...newRoute, createdAt: e.target.value })
        }
        InputLabelProps={{ shrink: true }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2.5,
            backgroundColor: alpha("#ffffff", 0.92),
          },
        }}
      />
      <FormControl fullWidth>
        <InputLabel id="state-select-label">Hoja de Gastos</InputLabel>
        <Select
          labelId="state-select-label"
          label="Hoja de Gastos"
          value={newRoute.state}
          onChange={(e) => setNewRoute({ ...newRoute, state: e.target.value })}
          sx={{ borderRadius: 2.5, backgroundColor: alpha("#ffffff", 0.92) }}
        >
          <MenuItem value="ENTREGADO">ENTREGADO</MenuItem>
          <MenuItem value="NO ENTREGADO">NO ENTREGADO</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Liquidado"
        value={newRoute.is_concluded}
        onChange={(e) =>
          setNewRoute({ ...newRoute, is_concluded: e.target.value })
        }
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2.5,
            backgroundColor: alpha("#ffffff", 0.92),
          },
        }}
      />

      {!isEditing ? (
        <MuiButton
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleCreateRoute}
          sx={primarySoftButtonSx}
        >
          Nuevo Viaje
        </MuiButton>
      ) : (
        <MuiButton
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => sendUpdateRoute(newRoute)}
          sx={primarySoftButtonSx}
        >
          Editar Viaje
        </MuiButton>
      )}
    </Box>
  );
};

interface ControlTransportTableProps {
  handleSelectRoute: (route: VehicleRouteResDto) => void;
  handleDeleteRoute: (id: number) => void;
  handleUpdateRoute: (route: VehicleRouteResDto) => void;
}

export const ControlTransportTable = ({
  handleSelectRoute,
  handleDeleteRoute,
  handleUpdateRoute,
}: ControlTransportTableProps) => {
  const { filteredRoutes } = useVehicleRoute();

  return (
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
      <MuiTable>
        <TableHead>
          <TableRow sx={{ bgcolor: alpha("#0f3d3e", 0.05) }}>
            <TableCell>Fecha</TableCell>
            <TableCell>Hoja de Gastos</TableCell>
            <TableCell>Vehiculo</TableCell>
            <TableCell>Punto de Carga</TableCell>
            <TableCell>Destino</TableCell>
            <TableCell>Quien Liquida</TableCell>
            <TableCell>Liquidado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRoutes.map((route) => (
            <TableRow key={route.id} hover>
              <TableCell>{formatIsoDate(route.createdAt, "dd-MM-yyyy")}</TableCell>
              <TableCell>{route.state}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>
                {route.vehicle?.name ?? "No especificado"}
              </TableCell>
              <TableCell>
                {route.vehicle_route_detail?.point_charge || "No especificado"}
              </TableCell>
              <TableCell>
                {route.vehicle_route_detail?.destiny || "No especificado"}
              </TableCell>
              <TableCell>
                {route.vehicle_route_detail?.who_destination ||
                  "No especificado"}
              </TableCell>
              <TableCell>{route.is_concluded}</TableCell>
              <TableCell>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  useFlexGap
                  flexWrap="wrap"
                >
                  <MuiButton
                    onClick={() => handleSelectRoute(route)}
                    variant="outlined"
                    color="primary"
                    sx={subtleOutlinedButtonSx}
                  >
                    Detalle
                  </MuiButton>
                  <MuiButton
                    onClick={() => handleDeleteRoute(route.id)}
                    variant="outlined"
                    color="secondary"
                    sx={dangerOutlinedButtonSx}
                  >
                    Borrar
                  </MuiButton>
                  <MuiButton
                    onClick={() => handleUpdateRoute(route)}
                    variant="outlined"
                    color="primary"
                    sx={subtleOutlinedButtonSx}
                  >
                    Editar
                  </MuiButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export const ControlTransport = () => {
  const { createRoute, deleteRoute, setRouteSelected, updateRoute, filteredRoutes } =
    useVehicleRoute();
  const { vehicles } = useVehicle();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [idRoute, setIdRoute] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [newRoute, setNewRoute] = useState<VehicleRouteDto>({
    createdAt: "",
    id_vehicle: 0,
    state: "NO ENTREGADO",
    is_concluded: "NO",
  });

  const handleSelectRoute = (route: VehicleRouteResDto) => {
    setRouteSelected(route);
    navigate(`/transporte/control/${route.id}`, {
      state: { from: location.pathname },
    });
  };

  const deliveredCount = filteredRoutes.filter(
    (route) => route.state === "ENTREGADO"
  ).length;
  const concludedCount = filteredRoutes.filter(
    (route) => route.is_concluded === "SI"
  ).length;

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
        <Stack spacing={{ xs: 2.5, md: 3 }}>
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
                <Stack spacing={1.25} sx={{ maxWidth: 640 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      letterSpacing: "0.22em",
                      opacity: 0.76,
                      fontSize: "0.68rem",
                    }}
                  >
                    Seguimiento diario
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1.04,
                      fontSize: { xs: "1.85rem", md: "2.4rem" },
                    }}
                  >
                    Control de viajes y liquidación
                  </Typography>
                  <Typography
                    sx={{ color: alpha("#f7f1e6", 0.84), maxWidth: 560 }}
                  >
                    Registra nuevas salidas, filtra por estado y accede al
                    detalle operativo sin salir del panel.
                  </Typography>
                </Stack>
                <Stack
                  direction={{ xs: "row", md: "column" }}
                  spacing={1.2}
                  sx={{ minWidth: { md: 240 } }}
                >
                  <Chip
                    label={`${vehicles.filter((vehicle) => vehicle.is_active).length} vehículos activos`}
                    sx={{
                      bgcolor: alpha("#f7f1e6", 0.14),
                      color: "#f7f1e6",
                      borderRadius: 99,
                    }}
                  />
                  <Chip
                    label={`${filteredRoutes.length} viajes visibles`}
                    sx={{
                      bgcolor: alpha("#f7f1e6", 0.14),
                      color: "#f7f1e6",
                      borderRadius: 99,
                    }}
                  />
                </Stack>
              </Stack>
            </Box>
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Stack spacing={2.5}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(3, minmax(0, 1fr))",
                    },
                    gap: 2,
                  }}
                >
                  {[
                    { label: "Viajes visibles", value: filteredRoutes.length },
                    { label: "Hojas entregadas", value: deliveredCount },
                    { label: "Liquidados", value: concludedCount },
                  ].map((metric) => (
                    <Card
                      key={metric.label}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: alpha("#0f3d3e", 0.04),
                        boxShadow: "none",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: "1.8rem", md: "2rem" },
                          lineHeight: 1,
                        }}
                      >
                        {metric.value}
                      </Typography>
                      <Typography color="text.secondary">
                        {metric.label}
                      </Typography>
                    </Card>
                  ))}
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      lg: "minmax(320px, 390px) 1fr",
                    },
                    gap: { xs: 2.5, md: 3 },
                    alignItems: "start",
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: 3.5,
                      border: "1px solid",
                      borderColor: alpha("#0f3d3e", 0.08),
                      boxShadow: "none",
                      background: alpha("#ffffff", 0.8),
                    }}
                  >
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography
                          sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                        >
                          {isEditing ? "Editar viaje" : "Nuevo viaje"}
                        </Typography>
                        <ControlTransportForm
                          createRoute={createRoute}
                          updateRoute={updateRoute}
                          isEditing={isEditing}
                          setIsEditing={setIsEditing}
                          idRoute={idRoute}
                          setIdRoute={setIdRoute}
                          newRoute={newRoute}
                          setNewRoute={setNewRoute}
                        />
                      </Stack>
                    </CardContent>
                  </Card>

                  <Box>
                    <ControlTransportFilter />
                    <ControlTransportTable
                      handleSelectRoute={handleSelectRoute}
                      handleDeleteRoute={deleteRoute}
                      handleUpdateRoute={(route) => {
                        setIsEditing(true);
                        setIdRoute(route.id);
                        setNewRoute({
                          createdAt: formatIsoDateForInput(route.createdAt),
                          id_vehicle: route.id_vehicle,
                          state: route.state,
                          is_concluded: route.is_concluded,
                        });
                      }}
                    />
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};

export const ControlTransportFilter = () => {
  const { searchTerm, setSearchTerm } = useVehicleRoute();

  const handleReset = () => {
    setSearchTerm("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        mb: 2.5,
      }}
    >
      <TextField
        label="Buscar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2.5,
            backgroundColor: alpha("#ffffff", 0.9),
          },
        }}
      />
      <MuiButton
        variant="outlined"
        color="secondary"
        onClick={handleReset}
        sx={subtleOutlinedButtonSx}
      >
        Resetear
      </MuiButton>
    </Box>
  );
};
