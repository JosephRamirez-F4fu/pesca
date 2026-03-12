import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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

export const ControlTransportDetailOilSection = () => {
  return (
    <Box>
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
    <Box>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6">Control de Ruta</Typography>
        <Button variant="contained" onClick={() => openCreate()}>
          Añadir
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ruta</TableCell>
              <TableCell>Uso de Petróleo</TableCell>
              <TableCell>Petroleo Establecido</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleRoutes.map((route) => (
              <TableRow key={route.id}>
                <TableCell>{handleRouteLabel(route.id_route)}</TableCell>
                <TableCell>{route.oil_use}</TableCell>
                <TableCell>{handleEstablishedOil(route.id_route)}</TableCell>
                <TableCell>{formatTransportDate(route.createdAt, "dd/MM")}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleEdit(route)}>
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => void deleteRoute(route.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <CrudModalCard
        open={open}
        title={editMode ? "Editar Uso de Petróleo" : "Añadir Uso de Petróleo"}
        submitLabel={editMode ? "Actualizar" : "Guardar"}
        onClose={() => closeDialog(handleClose)}
        onSubmit={() => void handleSubmit()}
      >
        <FormControl fullWidth>
          <InputLabel id="route-select-label">Ruta</InputLabel>
          <Select
            labelId="route-select-label"
            label="Ruta"
            value={oilControlled.id_route || ""}
            onChange={(event) =>
              setOilControlled({
                ...oilControlled,
                id_route: event.target.value as number,
              })
            }
            required
          >
            {vehicleRoutesFiltered.map((route) => (
              <MenuItem key={route.id} value={route.id}>
                {route.init} - {route.end}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Uso de Petróleo"
          type="number"
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
    </Box>
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
    <Box>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6">Petroleo Adicional</Typography>
        <Button variant="contained" onClick={() => openCreate()}>
          Añadir
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routesOilUse.map((currentOilUse) => (
              <TableRow key={currentOilUse.id}>
                <TableCell>{currentOilUse.description}</TableCell>
                <TableCell>{currentOilUse.oil_use}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(currentOilUse)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => void deleteRouteOilUse(currentOilUse.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <CrudModalCard
        open={open}
        title={editMode ? "Editar Uso de Petróleo" : "Añadir Uso de Petróleo"}
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
              label="Descripción"
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
          label="Uso de Petróleo"
          type="number"
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
    </Box>
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
    <Box
      sx={{
        padding: 2,
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "primary.main",
      }}
    >
      <Card sx={{ width: "25%", padding: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6">LIQUIDACION DE PETROLEO</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="body1">PETROLEO REAL USADO:</Typography>
          <Typography variant="body1">{resultControlled}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="body1">PETROLEO COMPUTADO:</Typography>
          <Typography variant="body1">{resultJustified}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="body1">PETROLEO EXTRA:</Typography>
          <Typography variant="body1">{resultUsed}</Typography>
        </Box>
        <Box sx={{ borderBottom: "1px solid", borderColor: "divider", my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="body1">LIQUIDACION:</Typography>
          <Typography variant="body1">{result}</Typography>
        </Box>
      </Card>
    </Box>
  );
};
