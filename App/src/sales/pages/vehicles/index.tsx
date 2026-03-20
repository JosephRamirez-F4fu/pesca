import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  FormControlLabel,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { APP_ROUTES } from "../../../core/router/paths";
import { SalesPageShell } from "../../components/sales-page-shell";
import { salesService } from "../../services/sales.service";
import type { SaleVehicle } from "../../types";

const defaultForm = {
  code: "",
  plate: "",
  description: "",
  is_active: true,
};

export const SalesVehiclesPage = () => {
  const [vehicles, setVehicles] = useState<SaleVehicle[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [editing, setEditing] = useState<SaleVehicle | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadVehicles = async () => {
    setError(null);
    try {
      setVehicles(await salesService.getVehicles());
    } catch {
      setError("No se pudo cargar el catálogo de vehículos.");
    }
  };

  useEffect(() => {
    void loadVehicles();
  }, []);

  const resetForm = () => {
    setEditing(null);
    setForm(defaultForm);
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      if (editing) {
        await salesService.updateVehicle(editing.id, form);
      } else {
        await salesService.createVehicle(form);
      }
      resetForm();
      await loadVehicles();
    } catch {
      setError("No se pudo guardar el vehículo. Revisa código o placa duplicados.");
    }
  };

  return (
    <SalesPageShell
      eyebrow="Ventas · Vehículos"
      title="Catálogo comercial de vehículos."
      description="Las unidades de venta se gestionan aquí, sin mezclar conductor y carro como en el modelo operativo anterior."
      actions={[{ label: "Ir a cuadres", to: APP_ROUTES.salesBalances }]}
    >
      <Stack spacing={3}>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Card sx={cardSx}>
          <Stack spacing={2.5}>
            <Typography variant="h5">
              {editing ? "Editar vehículo" : "Nuevo vehículo"}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              }}
            >
              <TextField
                label="Código"
                value={form.code}
                onChange={(event) =>
                  setForm((current) => ({ ...current, code: event.target.value }))
                }
              />
              <TextField
                label="Placa"
                value={form.plate}
                onChange={(event) =>
                  setForm((current) => ({ ...current, plate: event.target.value }))
                }
              />
              <TextField
                label="Descripción"
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                sx={{ gridColumn: { md: "1 / -1" } }}
              />
              {editing ? (
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.is_active}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          is_active: event.target.checked,
                        }))
                      }
                    />
                  }
                  label="Activo"
                />
              ) : null}
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
              <Button variant="contained" onClick={() => void handleSubmit()}>
                {editing ? "Actualizar" : "Guardar"}
              </Button>
              {editing ? (
                <Button variant="outlined" onClick={resetForm}>
                  Cancelar
                </Button>
              ) : null}
            </Stack>
          </Stack>
        </Card>

        <Card sx={cardSx}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Vehículos registrados
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Placa</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.code}</TableCell>
                  <TableCell>{vehicle.plate}</TableCell>
                  <TableCell>{vehicle.description || "Sin detalle"}</TableCell>
                  <TableCell>{vehicle.is_active ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={() => {
                        setEditing(vehicle);
                        setForm({
                          code: vehicle.code,
                          plate: vehicle.plate,
                          description: vehicle.description || "",
                          is_active: vehicle.is_active,
                        });
                      }}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!vehicles.length ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography color="text.secondary">
                      No hay vehículos registrados todavía.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </Card>
      </Stack>
    </SalesPageShell>
  );
};

const cardSx = {
  p: { xs: 2, md: 3 },
  borderRadius: "28px",
  border: "1px solid rgba(9, 52, 46, 0.1)",
  boxShadow: "0 18px 44px rgba(16, 42, 67, 0.08)",
};
