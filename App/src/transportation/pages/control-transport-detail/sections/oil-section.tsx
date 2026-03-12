import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useRoutes } from "../../../context/routes";
import { useVehicle } from "../../../context/transportist";
import { useVehicleRoute } from "../../../context/vehicle-route";
import { useVehicleRoutes } from "../../../context/vehicle-routes";
import { useVehicleRoutesOil } from "../../../context/vehicle_routes_oil_use";
import { RouteResDto } from "../../../dto/routes";
import {
  VehicleRoutesDto,
  VehicleRoutesResDto,
} from "../../../dto/vehicle-routes";
import {
  VehicleRoutesOilUseDto,
  VehicleRoutesOilUseResDto,
} from "../../../dto/vehicle_routes_oil_use";
import { CrudModalCard } from "../../../../shared/components/crud-modal-card";
import { useCrudDialog } from "../../../../shared/hooks/useCrudDialog";
import { formatTransportDate } from "../utils";
import {
  ActionButton,
  DangerButton,
  fieldSx,
  primaryButtonSx,
  SectionSurface,
  SummaryPill,
  tableWrapSx,
} from "./detail-surface";

export const ControlTransportDetailOilSection = () => {
  return (
    <Box sx={{ display: "grid", gap: 2.5 }}>
      <Stack spacing={0.8} sx={{ px: { xs: 0.5, md: 1 }, pt: 0.5 }}>
        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#0f7c78",
          }}
        >
          Petroleo
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: "#16324f", fontWeight: 800, maxWidth: 720 }}
        >
          Seguimiento de consumo controlado, computado y adicional
        </Typography>
      </Stack>
      <ControlOilControlled />
      <ControlOilJustified />
      <ResultOil />
    </Box>
  );
};

const ControlOilControlled = () => {
  const { routes } = useRoutes();
  const { vehicles } = useVehicle();
  const { routeSelected } = useVehicleRoute();
  const {
    vehicleRoutes,
    createRoute,
    updateRoute,
    deleteRoute,
    vehicleRoutesSelected,
    setVehicleRoutesSelected,
  } = useVehicleRoutes();
  const [vehicleRoutesFiltered, setVehicleRoutesFiltered] = useState<
    RouteResDto[]
  >([]);
  const [oilControlled, setOilControlled] = useState<VehicleRoutesDto>({
    id_route: 0,
    oil_use: 0,
    id_vehicle_route: routeSelected?.id || 0,
    createdAt: "",
  });
  const { open, editMode, openCreate, openEdit, closeDialog } =
    useCrudDialog();

  useEffect(() => {
    if (!routeSelected || !vehicles) {
      setVehicleRoutesFiltered([]);
      return;
    }

    const vehicle = vehicles.find(
      (currentVehicle) => currentVehicle.id === routeSelected.id_vehicle
    );

    if (!vehicle) {
      setVehicleRoutesFiltered([]);
      return;
    }

    setVehicleRoutesFiltered(
      routes.filter((route) => route.type === vehicle.type)
    );
  }, [routeSelected, routes, vehicles]);

  const handleClose = () => {
    setVehicleRoutesSelected(null);
    setOilControlled({
      id_route: vehicleRoutesFiltered[0]?.id || 0,
      oil_use: 0,
      id_vehicle_route: routeSelected?.id || 0,
      createdAt: "",
    });
  };

  const handleSubmit = async () => {
    if (!routeSelected) return;

    const payload = {
      ...oilControlled,
      createdAt: new Date(oilControlled.createdAt).toISOString(),
    };

    if (editMode) {
      if (!vehicleRoutesSelected) return;
      await updateRoute(vehicleRoutesSelected.id, payload);
    } else {
      await createRoute(payload);
    }

    handleClose();
  };

  const handleEdit = (route: VehicleRoutesResDto) => {
    openEdit(() => {
      setOilControlled({
        ...route,
        createdAt: formatTransportDate(route.createdAt, "yyyy-MM-dd"),
      });
      setVehicleRoutesSelected(route);
    });
  };

  const handleRouteLabel = (id: number) => {
    const route = routes.find((currentRoute) => currentRoute.id === id);
    return route ? `${route.init} - ${route.end}` : "";
  };

  const handleEstablishedOil = (id: number) => {
    const route = routes.find((currentRoute) => currentRoute.id === id);
    return route ? route.oil_use : 0;
  };

  return (
    <SectionSurface
      eyebrow="Consumo controlado"
      title="Control de ruta"
      subtitle="Compara el consumo real con el establecido en cada tramo sin mezclarlo con los extras."
      action={
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
          <SummaryPill label="Tramos" value={String(vehicleRoutes.length)} />
          <Button sx={primaryButtonSx} onClick={() => openCreate()}>
            Anadir
          </Button>
        </Stack>
      }
    >
      <Box sx={tableWrapSx}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ruta</TableCell>
              <TableCell>Uso real</TableCell>
              <TableCell>Uso base</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleRoutes.map((route) => (
              <TableRow key={route.id}>
                <TableCell>
                  <Typography sx={{ fontWeight: 700 }}>
                    {handleRouteLabel(route.id_route)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${route.oil_use} gal`}
                    sx={{
                      borderRadius: 999,
                      backgroundColor: "rgba(15, 124, 120, 0.08)",
                      color: "#0f3d3e",
                      fontWeight: 700,
                    }}
                  />
                </TableCell>
                <TableCell>{handleEstablishedOil(route.id_route)} gal</TableCell>
                <TableCell>{formatTransportDate(route.createdAt, "dd/MM")}</TableCell>
                <TableCell sx={{ width: 1, minWidth: 128 }}>
                  <Stack spacing={1}>
                    <ActionButton fullWidth onClick={() => handleEdit(route)}>
                      Editar
                    </ActionButton>
                    <DangerButton
                      fullWidth
                      onClick={() => void deleteRoute(route.id)}
                    >
                      Eliminar
                    </DangerButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <CrudModalCard
        open={open}
        title={editMode ? "Editar Uso de Petroleo" : "Anadir Uso de Petroleo"}
        submitLabel={editMode ? "Actualizar" : "Guardar"}
        onClose={() => closeDialog(handleClose)}
        onSubmit={() => void handleSubmit()}
      >
        <FormControl fullWidth sx={fieldSx}>
          <Select
            displayEmpty
            value={oilControlled.id_route || ""}
            onChange={(event) =>
              setOilControlled({
                ...oilControlled,
                id_route: event.target.value as number,
              })
            }
            required
          >
            <MenuItem value="">Ruta</MenuItem>
            {vehicleRoutesFiltered.map((route) => (
              <MenuItem key={route.id} value={route.id}>
                {route.init} - {route.end}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Uso de petroleo"
          type="number"
          sx={fieldSx}
          value={oilControlled.oil_use}
          onChange={(event) =>
            setOilControlled({
              ...oilControlled,
              oil_use: Number(event.target.value) || 0,
            })
          }
          required
        />
        <TextField
          label="Fecha"
          type="date"
          sx={fieldSx}
          value={oilControlled.createdAt}
          onChange={(event) =>
            setOilControlled({
              ...oilControlled,
              createdAt: event.target.value,
            })
          }
          InputLabelProps={{ shrink: true }}
          required
        />
      </CrudModalCard>
    </SectionSurface>
  );
};

const ControlOilJustified = () => {
  const { routeSelected } = useVehicleRoute();
  const {
    routesOilUse,
    createRouteOilUse,
    updateRouteOilUse,
    deleteRouteOilUse,
    setRouteOilUseSelected,
    routeOilUseSelected,
  } = useVehicleRoutesOil();
  const [oilUse, setOilUse] = useState<VehicleRoutesOilUseDto>({
    description: "",
    id_vehicle_route: 0,
    oil_use: 0,
  });
  const { open, editMode, openCreate, openEdit, closeDialog } =
    useCrudDialog();

  const optionsAdditionalOil = [
    "SALIDA LIMA",
    "PUENTE PIEDRA",
    "CARGA",
    "CALLAO",
    "CORRIDA",
    "CARGA ILO-MORRO",
  ];

  const handleClose = () => {
    setRouteOilUseSelected(null);
    setOilUse({ description: "", id_vehicle_route: 0, oil_use: 0 });
  };

  const handleSubmit = async () => {
    if (!routeSelected) return;

    const payload = {
      ...oilUse,
      id_vehicle_route: routeSelected.id,
    };

    if (routeOilUseSelected) {
      await updateRouteOilUse(routeOilUseSelected.id, payload);
    } else {
      await createRouteOilUse(payload);
    }

    handleClose();
  };

  const handleEdit = (selectedOilUse: VehicleRoutesOilUseResDto) => {
    openEdit(() => {
      setRouteOilUseSelected(selectedOilUse);
      setOilUse(selectedOilUse);
    });
  };

  return (
    <SectionSurface
      eyebrow="Consumo adicional"
      title="Petroleo extra"
      subtitle="Separa justificaciones operativas para detectar rapido cuando el desvio es real y no parte de la ruta."
      action={
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
          <SummaryPill label="Extras" value={String(routesOilUse.length)} />
          <Button sx={primaryButtonSx} onClick={() => openCreate()}>
            Anadir
          </Button>
        </Stack>
      }
    >
      <Box sx={tableWrapSx}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripcion</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routesOilUse.map((currentOilUse) => (
              <TableRow key={currentOilUse.id}>
                <TableCell>
                  <Typography sx={{ fontWeight: 700 }}>
                    {currentOilUse.description}
                  </Typography>
                </TableCell>
                <TableCell>{currentOilUse.oil_use} gal</TableCell>
                <TableCell sx={{ width: 1, minWidth: 128 }}>
                  <Stack spacing={1}>
                    <ActionButton fullWidth onClick={() => handleEdit(currentOilUse)}>
                      Editar
                    </ActionButton>
                    <DangerButton
                      fullWidth
                      onClick={() => void deleteRouteOilUse(currentOilUse.id)}
                    >
                      Eliminar
                    </DangerButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <CrudModalCard
        open={open}
        title={editMode ? "Editar Uso de Petroleo" : "Anadir Uso de Petroleo"}
        submitLabel={editMode ? "Actualizar" : "Guardar"}
        onClose={() => closeDialog(handleClose)}
        onSubmit={() => void handleSubmit()}
      >
        <Autocomplete
          options={optionsAdditionalOil}
          value={oilUse.description}
          freeSolo
          onChange={(_, value) =>
            setOilUse({ ...oilUse, description: value || "" })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Descripcion"
              sx={fieldSx}
              required
              onChange={(event) =>
                setOilUse({
                  ...oilUse,
                  description: event.target.value.toUpperCase(),
                })
              }
            />
          )}
        />
        <TextField
          label="Uso de petroleo"
          type="number"
          sx={fieldSx}
          value={oilUse.oil_use}
          onChange={(event) =>
            setOilUse({
              ...oilUse,
              oil_use: Number(event.target.value) || 0,
            })
          }
          required
        />
      </CrudModalCard>
    </SectionSurface>
  );
};

const ResultOil = () => {
  const { routeSelected } = useVehicleRoute();
  const { vehicleRoutes } = useVehicleRoutes();
  const { routesOilUse } = useVehicleRoutesOil();
  const { routes } = useRoutes();
  const [result, setResult] = useState(0);
  const [resultControlled, setResultControlled] = useState(0);
  const [resultJustified, setResultJustified] = useState(0);
  const [resultUsed, setResultUsed] = useState(0);

  useEffect(() => {
    if (!routeSelected) {
      return;
    }

    const oilUsed = routesOilUse.reduce((acc, route) => {
      if (route.id_vehicle_route === routeSelected.id) {
        return acc + route.oil_use;
      }
      return acc;
    }, 0);

    const oilUsedControlled = vehicleRoutes.reduce((acc, route) => {
      if (route.id_vehicle_route === routeSelected.id) {
        return acc + route.oil_use;
      }
      return acc;
    }, 0);

    const oilUsedJustified = vehicleRoutes
      .map((route) => {
        const matchedRoute = routes.find(
          (currentRoute) => currentRoute.id === route.id_route
        );
        return matchedRoute ? matchedRoute.oil_use : 0;
      })
      .reduce((acc, route) => acc + route, 0);

    setResultUsed(oilUsed);
    setResultControlled(oilUsedControlled);
    setResultJustified(oilUsedJustified);
    setResult(oilUsedControlled - oilUsedJustified - oilUsed);
  }, [routeSelected, vehicleRoutes, routes, routesOilUse]);

  return (
    <SectionSurface
      eyebrow="Cierre de petroleo"
      title="Liquidacion de petroleo"
      subtitle="Consolida lo controlado, lo computado y el extra para detectar diferencia real sin revisar tablas."
      action={
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
          <SummaryPill label="Real usado" value={`${resultControlled} gal`} />
          <SummaryPill label="Computado" value={`${resultJustified} gal`} />
        </Stack>
      }
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={2}
        sx={{ mt: 2.25 }}
      >
        <Box
          sx={{
            flex: 1.2,
            p: 2.2,
            borderRadius: 3,
            backgroundColor: "rgba(15, 124, 120, 0.08)",
            display: "grid",
            gap: 1.2,
          }}
        >
          <MetricRow label="Petroleo real usado" value={`${resultControlled} gal`} />
          <MetricRow label="Petroleo computado" value={`${resultJustified} gal`} />
          <MetricRow label="Petroleo extra" value={`${resultUsed} gal`} />
        </Box>
        <Box
          sx={{
            flex: 0.9,
            p: 2.4,
            borderRadius: 3,
            background:
              result >= 0
                ? "linear-gradient(180deg, rgba(15, 124, 120, 0.12) 0%, rgba(255,255,255,0.94) 100%)"
                : "linear-gradient(180deg, rgba(201, 130, 90, 0.16) 0%, rgba(255,255,255,0.94) 100%)",
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#567170",
            }}
          >
            Diferencia
          </Typography>
          <Typography
            variant="h3"
            sx={{
              mt: 1.2,
              color: result >= 0 ? "#0f7c78" : "#8f4c34",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {result} gal
          </Typography>
          <Typography sx={{ mt: 1, color: "#4f6a7a" }}>
            {result >= 0 ? "Exceso controlado" : "Faltante frente a lo esperado"}
          </Typography>
        </Box>
      </Stack>
    </SectionSurface>
  );
};

const MetricRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
    <Typography sx={{ color: "#4f6a7a" }}>{label}</Typography>
    <Typography sx={{ color: "#16324f", fontWeight: 700 }}>{value}</Typography>
  </Box>
);
