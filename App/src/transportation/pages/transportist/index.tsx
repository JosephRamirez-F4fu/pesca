import { useVehicle } from "../../context/transportist";
import { VehicleDto, VehicleRestDto } from "../../dto/vehicle";
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

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

const secondarySoftButtonSx = {
  borderRadius: 99,
  minHeight: 34,
  minWidth: 0,
  px: 1.35,
  color: "#0f3d3e",
  backgroundColor: alpha("#0f3d3e", 0.05),
  border: "1px solid rgba(15, 61, 62, 0.08)",
  boxShadow: "none",
  fontSize: "0.82rem",
  whiteSpace: "nowrap",
  "&:hover": {
    backgroundColor: alpha("#0f3d3e", 0.09),
    boxShadow: "none",
  },
};

const dangerSoftButtonSx = {
  borderRadius: 99,
  minHeight: 34,
  minWidth: 0,
  px: 1.35,
  color: "#8e4d2c",
  backgroundColor: alpha("#8e4d2c", 0.08),
  border: "1px solid rgba(142, 77, 44, 0.1)",
  boxShadow: "none",
  fontSize: "0.82rem",
  whiteSpace: "nowrap",
  "&:hover": {
    backgroundColor: alpha("#8e4d2c", 0.14),
    boxShadow: "none",
  },
};

export const TransportistShow = () => {
  const {
    vehicles,
    vehicleSelected,
    setVehicleSelected,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  } = useVehicle();

  const [formData, setFormData] = useState<VehicleDto>({
    name: "",
    user: "",
    plate: "",
    type: "",
    phone: "",
    is_active: true,
  });

  const handleEdit = (vehicle: VehicleRestDto) => {
    setVehicleSelected(vehicle);
    setFormData({
      name: vehicle.name,
      user: vehicle.user,
      plate: vehicle.plate,
      type: vehicle.type,
      phone: vehicle.phone,
      is_active: vehicle.is_active,
    });
  };

  const handleDelete = async (vehicle: VehicleRestDto) => {
    await deleteVehicle(vehicle.id);
  };

  const handleSubmit = async () => {
    if (vehicleSelected) {
      await updateVehicle(vehicleSelected.id, formData);
    } else {
      await createVehicle(formData);
    }
    setVehicleSelected(null);
    setFormData({
      name: "",
      user: "",
      plate: "",
      type: "",
      phone: "",
      is_active: true,
    });
  };

  const metrics = useMemo(() => {
    const active = vehicles.filter((vehicle) => vehicle.is_active).length;
    const trucks = vehicles.filter((vehicle) => vehicle.type === "CAMION").length;
    const tractos = vehicles.filter((vehicle) => vehicle.type === "TRACTO").length;

    return [
      { label: "Unidades activas", value: active },
      { label: "Camiones", value: trucks },
      { label: "Tractos", value: tractos },
    ];
  }, [vehicles]);

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
                <Stack spacing={1.25} sx={{ maxWidth: 620 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      letterSpacing: "0.22em",
                      opacity: 0.76,
                      fontSize: "0.68rem",
                    }}
                  >
                    Flota y conductores
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1.04,
                      fontSize: { xs: "1.85rem", md: "2.4rem" },
                    }}
                  >
                    Registro de choferes y unidades
                  </Typography>
                  <Typography
                    sx={{ color: alpha("#f7f1e6", 0.84), maxWidth: 560 }}
                  >
                    Mantén actualizados código, chofer, placa, tipo y estado
                    de cada unidad disponible para transporte.
                  </Typography>
                </Stack>
                <Stack
                  direction={{ xs: "row", md: "column" }}
                  spacing={1.2}
                  sx={{ minWidth: { md: 240 } }}
                >
                  <Chip
                    label={`${vehicles.length} registros totales`}
                    sx={{
                      bgcolor: alpha("#f7f1e6", 0.14),
                      color: "#f7f1e6",
                      borderRadius: 99,
                    }}
                  />
                  <Chip
                    label={`${metrics[0].value} activos`}
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
                      md: "repeat(3, minmax(0, 1fr))",
                    },
                    gap: 2,
                  }}
                >
                  {metrics.map((metric) => (
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
                      lg: "minmax(320px, 420px) 1fr",
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
                          {vehicleSelected ? "Editar unidad" : "Nueva unidad"}
                        </Typography>
                        <TextField
                          label="Chofer"
                          value={formData.user}
                          onChange={(e) =>
                            setFormData({ ...formData, user: e.target.value })
                          }
                          fullWidth
                        />
                        <TextField
                          label="Codigo"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              name: e.target.value.toUpperCase(),
                            })
                          }
                          fullWidth
                        />
                        <TextField
                          label="Placa"
                          value={formData.plate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              plate: e.target.value.toUpperCase(),
                            })
                          }
                          fullWidth
                        />
                        <TextField
                          label="Tipo"
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                          fullWidth
                          select
                        >
                          <MenuItem value="TRACTO">TRACTO</MenuItem>
                          <MenuItem value="CAMION">CAMION</MenuItem>
                        </TextField>
                        <TextField
                          label="Teléfono"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          fullWidth
                        />
                        {vehicleSelected && (
                          <TextField
                            label="Estado"
                            value={formData.is_active ? "Activo" : "Inactivo"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                is_active: e.target.value === "Activo",
                              })
                            }
                            fullWidth
                            select
                          >
                            <MenuItem value="Activo">Activo</MenuItem>
                            <MenuItem value="Inactivo">Inactivo</MenuItem>
                          </TextField>
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSubmit}
                          sx={primarySoftButtonSx}
                        >
                          {vehicleSelected ? "Editar" : "Crear"}
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>

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
                          <TableCell>Codigo</TableCell>
                          <TableCell>Chofer</TableCell>
                          <TableCell>Placa</TableCell>
                          <TableCell>Tipo</TableCell>
                          <TableCell>Teléfono</TableCell>
                          <TableCell>Estado</TableCell>
                          <TableCell>Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {vehicles.map((vehicle, id) => (
                          <TableRow key={id} hover>
                            <TableCell sx={{ fontWeight: 700 }}>
                              {vehicle.name}
                            </TableCell>
                            <TableCell>{vehicle.user}</TableCell>
                            <TableCell>{vehicle.plate}</TableCell>
                            <TableCell>{vehicle.type}</TableCell>
                            <TableCell>{vehicle.phone}</TableCell>
                            <TableCell>
                              <Chip
                                size="small"
                                label={vehicle.is_active ? "Activo" : "Inactivo"}
                                sx={{
                                  bgcolor: vehicle.is_active
                                    ? alpha("#1f6a5d", 0.12)
                                    : alpha("#8e4d2c", 0.12),
                                  color: vehicle.is_active
                                    ? "#1f6a5d"
                                    : "#8e4d2c",
                                  borderRadius: 99,
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ width: 1, minWidth: 132 }}>
                              <Stack
                                direction="column"
                                spacing={0.75}
                                useFlexGap
                                alignItems="stretch"
                              >
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleEdit(vehicle)}
                                  sx={{ ...secondarySoftButtonSx, width: "100%" }}
                                >
                                  Editar
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleDelete(vehicle)}
                                  sx={{ ...dangerSoftButtonSx, width: "100%" }}
                                >
                                  Eliminar
                                </Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};
