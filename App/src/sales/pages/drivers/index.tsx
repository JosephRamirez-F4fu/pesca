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
import type { SaleDriver } from "../../types";

const defaultForm = {
  name: "",
  phone: "",
  is_active: true,
};

export const SalesDriversPage = () => {
  const [drivers, setDrivers] = useState<SaleDriver[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [editing, setEditing] = useState<SaleDriver | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadDrivers = async () => {
    setLoading(true);
    setError(null);
    try {
      setDrivers(await salesService.getDrivers());
    } catch {
      setError("No se pudo cargar el catálogo de choferes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDrivers();
  }, []);

  const resetForm = () => {
    setEditing(null);
    setForm(defaultForm);
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      if (editing) {
        await salesService.updateDriver(editing.id, form);
      } else {
        await salesService.createDriver(form);
      }
      resetForm();
      await loadDrivers();
    } catch {
      setError("No se pudo guardar el chofer. Verifica si el nombre ya existe.");
    }
  };

  return (
    <SalesPageShell
      eyebrow="Ventas · Choferes"
      title="Catálogo comercial de choferes."
      description="Este catálogo alimenta el cuadre de venta y queda separado del modelo legado de transporte."
      actions={[{ label: "Ir a cuadres", to: APP_ROUTES.salesBalances }]}
    >
      <Stack spacing={3}>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Card sx={cardSx}>
          <Stack spacing={2.5}>
            <Typography variant="h5">
              {editing ? "Editar chofer" : "Nuevo chofer"}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              }}
            >
              <TextField
                label="Nombre"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
              />
              <TextField
                label="Teléfono"
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({ ...current, phone: event.target.value }))
                }
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
            Choferes registrados
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>{driver.name}</TableCell>
                  <TableCell>{driver.phone || "Sin dato"}</TableCell>
                  <TableCell>{driver.is_active ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={() => {
                        setEditing(driver);
                        setForm({
                          name: driver.name,
                          phone: driver.phone || "",
                          is_active: driver.is_active,
                        });
                      }}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!drivers.length && !loading ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography color="text.secondary">
                      No hay choferes registrados todavía.
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
