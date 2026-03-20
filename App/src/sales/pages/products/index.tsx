import { useEffect, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Alert,
  Button,
  Card,
  FormControlLabel,
  InputAdornment,
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
import type { Product } from "../../types";

const defaultForm = {
  name: "",
  is_active: true,
};

export const SalesProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [editing, setEditing] = useState<Product | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async (search?: string) => {
    setError(null);
    try {
      setProducts(await salesService.getProducts(search));
    } catch {
      setError("No se pudo cargar el catálogo de productos.");
    }
  };

  useEffect(() => {
    void loadProducts(query);
  }, [query]);

  const resetForm = () => {
    setEditing(null);
    setForm(defaultForm);
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      if (editing) {
        await salesService.updateProduct(editing.id, form);
      } else {
        await salesService.createProduct({ name: form.name });
      }
      resetForm();
      await loadProducts(query);
    } catch {
      setError("No se pudo guardar el producto. Verifica si el nombre ya existe.");
    }
  };

  return (
    <SalesPageShell
      eyebrow="Ventas · Productos"
      title="Catálogo base de productos."
      description="El cuadre usa este catálogo para evitar escritura repetida. Las variaciones comerciales se siguen capturando por fila en el detalle."
      actions={[{ label: "Ir a cuadres", to: APP_ROUTES.salesBalances }]}
    >
      <Stack spacing={3}>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Card sx={cardSx}>
          <Stack spacing={2.5}>
            <Typography variant="h5">
              {editing ? "Editar producto" : "Nuevo producto"}
            </Typography>
            <TextField
              label="Nombre"
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
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
          <Stack spacing={2}>
            <Typography variant="h5">Productos registrados</Typography>
            <TextField
              label="Buscar producto"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.is_active ? "Activo" : "Inactivo"}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        onClick={() => {
                          setEditing(product);
                          setForm({
                            name: product.name,
                            is_active: product.is_active,
                          });
                        }}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!products.length ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography color="text.secondary">
                        No hay productos para la búsqueda actual.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </Stack>
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
