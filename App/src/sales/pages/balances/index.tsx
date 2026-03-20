import { useEffect, useMemo, useState } from "react";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import {
  Alert,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../core/router/paths";
import { SalesPageShell } from "../../components/sales-page-shell";
import { salesService } from "../../services/sales.service";
import type { SaleBalanceSummary, SaleDriver, SaleVehicle } from "../../types";

const today = new Date().toISOString().slice(0, 10);
const DAY_WINDOW = 30;

const defaultForm = {
  sale_date: today,
  id_sale_driver: "",
  id_sale_vehicle: "",
  boxes_arrived: "",
  boxes_sold: "",
  notes: "",
};

export const SalesBalancesPage = () => {
  const navigate = useNavigate();
  const [balances, setBalances] = useState<SaleBalanceSummary[]>([]);
  const [drivers, setDrivers] = useState<SaleDriver[]>([]);
  const [vehicles, setVehicles] = useState<SaleVehicle[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [windowIndex, setWindowIndex] = useState(0);
  const [balanceToDelete, setBalanceToDelete] = useState<SaleBalanceSummary | null>(
    null
  );
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [balanceData, driverData, vehicleData] = await Promise.all([
        salesService.getBalances(),
        salesService.getDrivers(),
        salesService.getVehicles(),
      ]);
      setBalances(balanceData);
      setWindowIndex(0);
      setDrivers(driverData.filter((item) => item.is_active));
      setVehicles(vehicleData.filter((item) => item.is_active));
    } catch {
      setError("No se pudo cargar la información de cuadres.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const sortedBalances = useMemo(
    () =>
      [...balances].sort((left, right) => {
        const dateDiff =
          new Date(right.sale_date).getTime() - new Date(left.sale_date).getTime();

        if (dateDiff !== 0) {
          return dateDiff;
        }

        return right.id - left.id;
      }),
    [balances]
  );

  const latestSaleDate = sortedBalances.length
    ? new Date(sortedBalances[0].sale_date)
    : null;

  const currentWindow = useMemo(() => {
    if (!latestSaleDate) {
      return null;
    }

    const end = new Date(latestSaleDate);
    end.setHours(23, 59, 59, 999);
    end.setDate(end.getDate() - windowIndex * DAY_WINDOW);

    const start = new Date(end);
    start.setDate(start.getDate() - (DAY_WINDOW - 1));
    start.setHours(0, 0, 0, 0);

    const items = sortedBalances.filter((balance) => {
      const saleDate = new Date(balance.sale_date);
      return saleDate >= start && saleDate <= end;
    });

    return { start, end, items };
  }, [latestSaleDate, sortedBalances, windowIndex]);

  const totalWindows = useMemo(() => {
    if (!latestSaleDate || !sortedBalances.length) {
      return 0;
    }

    const oldestSaleDate = new Date(
      sortedBalances[sortedBalances.length - 1].sale_date
    );
    const diffMs = latestSaleDate.getTime() - oldestSaleDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return Math.floor(diffDays / DAY_WINDOW) + 1;
  }, [latestSaleDate, sortedBalances]);

  const handleCreate = async () => {
    setError(null);
    try {
      const created = await salesService.createBalance({
        sale_date: form.sale_date,
        id_sale_driver: Number(form.id_sale_driver),
        id_sale_vehicle: Number(form.id_sale_vehicle),
        boxes_arrived: Number(form.boxes_arrived),
        boxes_sold: Number(form.boxes_sold),
        notes: form.notes,
      });
      setForm(defaultForm);
      await loadData();
      navigate(APP_ROUTES.salesBalanceDetail(created.id), {
        state: { from: APP_ROUTES.salesBalances },
      });
    } catch {
      setError("No se pudo crear el cuadre. Verifica cabecera y catálogos.");
    }
  };

  const handleDelete = async () => {
    if (!balanceToDelete) {
      return;
    }

    setDeleteLoading(true);
    setError(null);

    try {
      await salesService.deleteBalance(balanceToDelete.id);
      setBalanceToDelete(null);
      await loadData();
    } catch {
      setError("No se pudo eliminar el cuadre.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <SalesPageShell
      eyebrow="Ventas · Cuadres"
      title="Cabecera diaria y seguimiento del detalle vendido."
      description="Crea primero el cuadre con fecha, chofer, vehículo, cajas llegadas y cajas vendidas manuales. Luego abre el detalle para registrar producto, variación, peso y precio."
      actions={[
        { label: "Choferes", to: APP_ROUTES.salesDrivers },
        { label: "Vehículos", to: APP_ROUTES.salesVehicles },
        { label: "Productos", to: APP_ROUTES.salesProducts },
      ]}
    >
      <Stack spacing={3}>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Card sx={cardSx}>
          <Stack spacing={2.5}>
            <Typography variant="h5">Nuevo cuadre</Typography>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              }}
            >
              <TextField
                label="Día de venta"
                type="date"
                value={form.sale_date}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    sale_date: event.target.value,
                  }))
                }
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                label="Chofer"
                value={form.id_sale_driver}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    id_sale_driver: event.target.value,
                  }))
                }
              >
                {drivers.map((driver) => (
                  <MenuItem key={driver.id} value={driver.id}>
                    {driver.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Vehículo"
                value={form.id_sale_vehicle}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    id_sale_vehicle: event.target.value,
                  }))
                }
              >
                {vehicles.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.code} · {vehicle.plate}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Cajas que llegaron"
                type="number"
                value={form.boxes_arrived}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    boxes_arrived: event.target.value,
                  }))
                }
              />
              <TextField
                label="Cajas vendidas manuales"
                type="number"
                value={form.boxes_sold}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    boxes_sold: event.target.value,
                  }))
                }
              />
              <TextField
                label="Notas"
                value={form.notes}
                onChange={(event) =>
                  setForm((current) => ({ ...current, notes: event.target.value }))
                }
                sx={{ gridColumn: { md: "1 / -1" } }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={() => void handleCreate()}
              sx={{ alignSelf: "flex-start" }}
            >
              Crear y abrir detalle
            </Button>
          </Stack>
        </Card>

        <Card sx={cardSx}>
          <Stack spacing={2}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1.5}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              <Typography variant="h5">Cuadres registrados</Typography>
              {currentWindow ? (
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                  <Typography color="text.secondary" sx={{ alignSelf: "center" }}>
                    {currentWindow.start.toISOString().slice(0, 10)} al{" "}
                    {currentWindow.end.toISOString().slice(0, 10)}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      disabled={windowIndex >= totalWindows - 1}
                      onClick={() =>
                        setWindowIndex((current) => Math.min(current + 1, totalWindows - 1))
                      }
                    >
                      30 días anteriores
                    </Button>
                    <Button
                      variant="outlined"
                      disabled={windowIndex === 0}
                      onClick={() => setWindowIndex((current) => Math.max(current - 1, 0))}
                    >
                      Más recientes
                    </Button>
                  </Stack>
                </Stack>
              ) : null}
            </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Vehículo</TableCell>
                <TableCell>Chofer</TableCell>
                <TableCell>Cajas llegaron</TableCell>
                <TableCell>Cajas vendidas</TableCell>
                <TableCell>Venta total</TableCell>
                <TableCell>Promedio peso/caja</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentWindow?.items.map((balance) => (
                <TableRow key={balance.id}>
                  <TableCell>{balance.sale_date.slice(0, 10)}</TableCell>
                  <TableCell>{balance.vehicle.code}</TableCell>
                  <TableCell>{balance.driver.name}</TableCell>
                  <TableCell>{balance.boxes_arrived}</TableCell>
                  <TableCell>{balance.boxes_sold}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("es-PE", {
                      style: "currency",
                      currency: "PEN",
                      minimumFractionDigits: 2,
                    }).format(balance.gross_total)}
                  </TableCell>
                  <TableCell>{balance.average_weight_per_box.toFixed(2)} kg</TableCell>
                  <TableCell>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                      <Button
                        component={RouterLink}
                        to={APP_ROUTES.salesBalanceDetail(balance.id)}
                        state={{ from: APP_ROUTES.salesBalances }}
                        startIcon={<ReceiptLongRoundedIcon />}
                      >
                        Abrir
                      </Button>
                      <Button
                        color="error"
                        startIcon={<DeleteOutlineRoundedIcon />}
                        onClick={() => setBalanceToDelete(balance)}
                      >
                        Borrar
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {!currentWindow?.items.length && !loading ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Typography color="text.secondary">
                      No hay cuadres registrados en este rango de 30 días.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
          </Stack>
        </Card>
      </Stack>

      <Dialog
        open={Boolean(balanceToDelete)}
        onClose={() => {
          if (!deleteLoading) {
            setBalanceToDelete(null);
          }
        }}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "28px",
            border: "1px solid rgba(110, 29, 10, 0.12)",
            boxShadow: "0 22px 52px rgba(74, 20, 6, 0.16)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Eliminar cuadre</DialogTitle>
        <DialogContent>
          <Stack spacing={1.25}>
            <Typography color="text.secondary">
              Esta acción eliminará el cuadre y todo su detalle vendido.
            </Typography>
            {balanceToDelete ? (
              <Box
                sx={{
                  p: 2,
                  borderRadius: "18px",
                  bgcolor: "rgba(122, 39, 18, 0.05)",
                  border: "1px solid rgba(122, 39, 18, 0.08)",
                }}
              >
                <Typography fontWeight={700}>
                  {balanceToDelete.sale_date.slice(0, 10)} · {balanceToDelete.vehicle.code}
                </Typography>
                <Typography color="text.secondary">
                  Chofer: {balanceToDelete.driver.name}
                </Typography>
              </Box>
            ) : null}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="text"
            onClick={() => setBalanceToDelete(null)}
            disabled={deleteLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => void handleDelete()}
            disabled={deleteLoading}
          >
            Confirmar eliminación
          </Button>
        </DialogActions>
      </Dialog>
    </SalesPageShell>
  );
};

const cardSx = {
  p: { xs: 2, md: 3 },
  borderRadius: "28px",
  border: "1px solid rgba(9, 52, 46, 0.1)",
  boxShadow: "0 18px 44px rgba(16, 42, 67, 0.08)",
};
