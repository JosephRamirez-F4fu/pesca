import { useEffect, useMemo, useState } from "react";
import type { SyntheticEvent } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
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
import { useParams } from "react-router-dom";
import { APP_ROUTES } from "../../../core/router/paths";
import { SalesMetricCard } from "../../components/sales-metric-card";
import { SalesPageShell } from "../../components/sales-page-shell";
import { salesService } from "../../services/sales.service";
import type {
  Product,
  SaleBalance,
  SaleBalanceDetail,
  SaleDriver,
  SaleVehicle,
} from "../../types";

const toCurrency = (value: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(value);

type InlineDetailEditor =
  | {
      mode: "edit";
      detailId: number;
      productId: number;
      boxes_sold: string;
      weight_sold: string;
      unit_price: string;
    }
  | {
      mode: "variation";
      productId: number;
      boxes_sold: string;
      weight_sold: string;
      unit_price: string;
    };

export const SalesBalanceDetailPage = () => {
  const params = useParams();
  const balanceId = Number(params.id);
  const [balance, setBalance] = useState<SaleBalance | null>(null);
  const [drivers, setDrivers] = useState<SaleDriver[]>([]);
  const [vehicles, setVehicles] = useState<SaleVehicle[]>([]);
  const [productOptions, setProductOptions] = useState<Product[]>([]);
  const [productQuery, setProductQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailEditor, setDetailEditor] = useState<InlineDetailEditor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [headerForm, setHeaderForm] = useState({
    sale_date: "",
    id_sale_driver: "",
    id_sale_vehicle: "",
    boxes_arrived: "",
    boxes_sold: "",
    empty_boxes: "",
    notes: "",
    status: "draft",
  });
  const [detailForm, setDetailForm] = useState({
    boxes_sold: "",
    weight_sold: "",
    unit_price: "",
  });
  const emptyBoxes = balance?.empty_boxes ?? 0;

  const exactProductMatch = useMemo(() => {
    const normalized = productQuery.trim().toUpperCase();
    return productOptions.some((product) => product.name === normalized);
  }, [productOptions, productQuery]);

  const getProductLabel = (option: string | Product) =>
    typeof option === "string" ? option : option.name;

  const groupedDetails = useMemo(() => {
    const groups = new Map<
      number,
      {
        productId: number;
        productName: string;
        details: SaleBalanceDetail[];
      }
    >();

    balance?.details.forEach((detail) => {
      const currentGroup = groups.get(detail.id_product);

      if (currentGroup) {
        currentGroup.details.push(detail);
        return;
      }

      groups.set(detail.id_product, {
        productId: detail.id_product,
        productName: detail.product_name,
        details: [detail],
      });
    });

    return Array.from(groups.values());
  }, [balance?.details]);

  useEffect(() => {
    if (!selectedProduct) {
      return;
    }

    const syncedProduct = productOptions.find(
      (product) => product.id === selectedProduct.id
    );

    if (syncedProduct && syncedProduct !== selectedProduct) {
      setSelectedProduct(syncedProduct);
    }
  }, [productOptions, selectedProduct]);

  useEffect(() => {
    if (!Number.isFinite(balanceId)) {
      setError("El identificador del cuadre es inválido.");
      return;
    }

    void (async () => {
      setError(null);
      try {
        const [balanceData, driverData, vehicleData, productData] =
          await Promise.all([
            salesService.getBalanceById(balanceId),
            salesService.getDrivers(),
            salesService.getVehicles(),
            salesService.getProducts(),
          ]);
        setBalance(balanceData);
        setDrivers(driverData.filter((item) => item.is_active));
        setVehicles(vehicleData.filter((item) => item.is_active));
        setProductOptions(productData.filter((item) => item.is_active));
        setHeaderForm({
          sale_date: balanceData.sale_date.slice(0, 10),
          id_sale_driver: String(balanceData.driver.id),
          id_sale_vehicle: String(balanceData.vehicle.id),
          boxes_arrived: String(balanceData.boxes_arrived),
          boxes_sold: String(balanceData.boxes_sold),
          empty_boxes: String(balanceData.empty_boxes ?? 0),
          notes: balanceData.notes || "",
          status: balanceData.status,
        });
      } catch {
        setError("No se pudo cargar el cuadre de venta.");
      }
    })();
  }, [balanceId]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void salesService
        .getProducts(productQuery)
        .then((products) => setProductOptions(products.filter((item) => item.is_active)))
        .catch(() => {
          setError("No se pudo consultar el catálogo de productos.");
        });
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [productQuery]);

  const refreshBalance = async () => {
    const current = await salesService.getBalanceById(balanceId);
    setBalance(current);
    setHeaderForm({
      sale_date: current.sale_date.slice(0, 10),
      id_sale_driver: String(current.driver.id),
      id_sale_vehicle: String(current.vehicle.id),
      boxes_arrived: String(current.boxes_arrived),
      boxes_sold: String(current.boxes_sold),
      empty_boxes: String(current.empty_boxes ?? 0),
      notes: current.notes || "",
      status: current.status,
    });
  };

  const resetDetailForm = () => {
    setSelectedProduct(null);
    setProductQuery("");
    setDetailForm({
      boxes_sold: "",
      weight_sold: "",
      unit_price: "",
    });
  };

  const resetDetailEditor = () => {
    setDetailEditor(null);
  };

  const handleSaveHeader = async () => {
    setError(null);
    try {
      const updated = await salesService.updateBalance(balanceId, {
        sale_date: headerForm.sale_date,
        id_sale_driver: Number(headerForm.id_sale_driver),
        id_sale_vehicle: Number(headerForm.id_sale_vehicle),
        boxes_arrived: Number(headerForm.boxes_arrived),
        boxes_sold: Number(headerForm.boxes_sold),
        empty_boxes: Number(headerForm.empty_boxes),
        notes: headerForm.notes,
        status: headerForm.status as "draft" | "closed",
      });
      setBalance(updated);
    } catch {
      setError("No se pudo actualizar la cabecera del cuadre.");
    }
  };

  const handleCreateProduct = async () => {
    setError(null);
    try {
      const created = await salesService.createProduct({ name: productQuery });
      const nextOptions = [
        created,
        ...productOptions.filter((item) => item.id !== created.id),
      ];
      setProductOptions(nextOptions);
      setSelectedProduct(created);
      setProductQuery(created.name);
    } catch {
      setError("No se pudo crear el producto inline.");
    }
  };

  const handleSaveDetail = async () => {
    if (!selectedProduct) {
      setError("Selecciona un producto o créalo antes de guardar la fila.");
      return;
    }

    setError(null);
    try {
      const payload = {
        id_product: selectedProduct.id,
        variation: null,
        boxes_sold: Number(detailForm.boxes_sold),
        weight_sold: Number(detailForm.weight_sold),
        unit_price: Number(detailForm.unit_price),
      };

      const updatedBalance = await salesService.createBalanceDetail(balanceId, payload);

      setBalance(updatedBalance);
      resetDetailForm();
    } catch {
      setError(
        "No se pudo guardar el detalle. Revisa cajas, peso, precio y disponibilidad del producto."
      );
    }
  };

  const handleEditDetail = (detail: SaleBalanceDetail) => {
    setDetailEditor({
      mode: "edit",
      detailId: detail.id,
      productId: detail.id_product,
      boxes_sold: String(detail.boxes_sold),
      weight_sold: String(detail.weight_sold),
      unit_price: String(detail.unit_price),
    });
  };

  const handleAddVariation = (productId: number) => {
    setDetailEditor({
      mode: "variation",
      productId,
      boxes_sold: "",
      weight_sold: "",
      unit_price: "",
    });
  };

  const handleSaveInlineDetail = async () => {
    if (!detailEditor) {
      return;
    }

    setError(null);

    try {
      const payload = {
        id_product: detailEditor.productId,
        variation: null,
        boxes_sold: Number(detailEditor.boxes_sold),
        weight_sold: Number(detailEditor.weight_sold),
        unit_price: Number(detailEditor.unit_price),
      };

      const updatedBalance =
        detailEditor.mode === "edit"
          ? await salesService.updateBalanceDetail(
              balanceId,
              detailEditor.detailId,
              payload
            )
          : await salesService.createBalanceDetail(balanceId, payload);

      setBalance(updatedBalance);
      resetDetailEditor();
    } catch {
      setError("No se pudo guardar la variación dentro de la tabla.");
    }
  };

  const handleDeleteDetail = async (detailId: number) => {
    setError(null);
    try {
      const updated = await salesService.deleteBalanceDetail(balanceId, detailId);
      setBalance(updated);
      if (detailEditor?.mode === "edit" && detailEditor.detailId === detailId) {
        resetDetailEditor();
      }
    } catch {
      setError("No se pudo eliminar la fila del detalle.");
    }
  };

  if (!balance) {
    return (
      <SalesPageShell
        eyebrow="Ventas · Cuadre"
        title="Cargando cuadre."
        description="Estamos reuniendo la cabecera, el detalle y los catálogos necesarios."
        actions={[{ label: "Volver a cuadres", to: APP_ROUTES.salesBalances }]}
      >
        <Card sx={cardSx}>
          {error ? <Alert severity="error">{error}</Alert> : <Typography>Cargando...</Typography>}
        </Card>
      </SalesPageShell>
    );
  }

  return (
    <SalesPageShell
      eyebrow="Ventas · Detalle de cuadre"
      title="Cuadre de venta"
      description={`Fecha: ${balance.sale_date.slice(0, 10)} · Chofer: ${balance.driver.name} · Vehículo: ${balance.vehicle.code}`}
      actions={[
        { label: "Volver a cuadres", to: APP_ROUTES.salesBalances },
        { label: "Productos", to: APP_ROUTES.salesProducts },
      ]}
    >
      <Stack spacing={3}>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: 3,
          }}
        >
          <SalesMetricCard label="Cajas llegaron" value={String(balance.boxes_arrived)} />
          <SalesMetricCard label="Cajas vendidas" value={String(balance.boxes_sold)} />
          <SalesMetricCard label="Cajas vacías" value={String(emptyBoxes)} />
          <SalesMetricCard
            label="Cajas sobrantes con producto"
            value={String(balance.boxes_remaining)}
          />
          <SalesMetricCard label="Peso total" value={`${balance.total_weight.toFixed(2)} kg`} />
          <SalesMetricCard
            label="Promedio peso/caja vendida"
            value={`${balance.average_weight_per_box.toFixed(2)} kg`}
          />
          <SalesMetricCard
            label="Venta total"
            value={toCurrency(balance.gross_total)}
            tone="accent"
          />
        </Box>

        <Card sx={cardSx}>
          <Stack spacing={2.5}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1.5}
              justifyContent="space-between"
            >
              <Typography variant="h5">Cabecera del cuadre</Typography>
              <Chip
                label={balance.status === "closed" ? "Cerrado" : "Borrador"}
                sx={{
                  alignSelf: "flex-start",
                  bgcolor:
                    balance.status === "closed"
                      ? "rgba(9, 52, 46, 0.1)"
                      : "rgba(110,38,30,0.1)",
                  color: balance.status === "closed" ? "#09342e" : "#6e261e",
                }}
              />
            </Stack>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              }}
            >
              <TextField
                type="date"
                label="Día de venta"
                value={headerForm.sale_date}
                onChange={(event) =>
                  setHeaderForm((current) => ({
                    ...current,
                    sale_date: event.target.value,
                  }))
                }
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                label="Estado"
                value={headerForm.status}
                onChange={(event) =>
                  setHeaderForm((current) => ({
                    ...current,
                    status: event.target.value,
                  }))
                }
              >
                <MenuItem value="draft">Borrador</MenuItem>
                <MenuItem value="closed">Cerrado</MenuItem>
              </TextField>
              <TextField
                select
                label="Chofer"
                value={headerForm.id_sale_driver}
                onChange={(event) =>
                  setHeaderForm((current) => ({
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
                value={headerForm.id_sale_vehicle}
                onChange={(event) =>
                  setHeaderForm((current) => ({
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
                value={headerForm.boxes_arrived}
                onChange={(event) =>
                  setHeaderForm((current) => ({
                    ...current,
                    boxes_arrived: event.target.value,
                  }))
                }
              />
              <TextField
                label="Cajas vendidas del día"
                type="number"
                value={headerForm.boxes_sold}
                onChange={(event) =>
                  setHeaderForm((current) => ({
                    ...current,
                    boxes_sold: event.target.value,
                  }))
                }
              />
              <TextField
                label="Cajas vacías sin producto"
                type="number"
                value={headerForm.empty_boxes}
                onChange={(event) =>
                  setHeaderForm((current) => ({
                    ...current,
                    empty_boxes: event.target.value,
                  }))
                }
              />
              <TextField
                label="Cajas registradas en detalle"
                value={String(balance.calculated_boxes_sold)}
                InputProps={{ readOnly: true }}
              />
              <Box
                sx={{
                  borderRadius: "20px",
                  border: "1px solid rgba(9, 52, 46, 0.16)",
                  bgcolor: "rgba(246, 249, 251, 0.9)",
                  px: 2,
                  py: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: 88,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Promedio de peso por caja vendida
                </Typography>
                <Typography variant="h5" sx={{ color: "#09342e", mt: 0.5 }}>
                  {balance.average_weight_per_box.toFixed(2)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Calculado con peso total del detalle / cajas vendidas del día
                </Typography>
              </Box>
              <TextField
                label="Notas"
                value={headerForm.notes}
                onChange={(event) =>
                  setHeaderForm((current) => ({
                    ...current,
                    notes: event.target.value,
                  }))
                }
                sx={{ gridColumn: { md: "1 / -1" } }}
              />
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
              <Button variant="contained" onClick={() => void handleSaveHeader()}>
                Guardar cabecera
              </Button>
              <Button variant="outlined" onClick={() => void refreshBalance()}>
                Recargar cuadre
              </Button>
            </Stack>
          </Stack>
        </Card>

        <Card sx={cardSx}>
          <Stack spacing={2.5}>
            <Typography variant="h5">
              Agregar producto
            </Typography>
            <Typography color="text.secondary">
              Si eliges un producto existente, se agrega otra fila del mismo producto
              con peso y precio distintos.
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              }}
            >
              <Autocomplete
                freeSolo
                clearOnBlur={false}
                selectOnFocus
                options={productOptions}
                getOptionLabel={getProductLabel}
                isOptionEqualToValue={(option, value) => {
                  if (typeof option === "string") {
                    return option === getProductLabel(value);
                  }

                  if (typeof value === "string") {
                    return option.name === value;
                  }

                  return option.id === value.id;
                }}
                value={selectedProduct}
                onChange={(
                  _event: SyntheticEvent,
                  value: string | Product | null
                ) => {
                  if (typeof value === "string") {
                    setSelectedProduct(null);
                    setProductQuery(value.toUpperCase());
                    return;
                  }

                  setSelectedProduct(value);
                  setProductQuery(value?.name || "");
                }}
                inputValue={productQuery}
                onInputChange={(_event, value) => {
                  setProductQuery(value.toUpperCase());
                }}
                renderInput={(params) => <TextField {...params} label="Producto" />}
              />
              <TextField
                label="Cajas registradas (opcional)"
                type="number"
                value={detailForm.boxes_sold}
                onChange={(event) =>
                  setDetailForm((current) => ({
                    ...current,
                    boxes_sold: event.target.value,
                  }))
                }
              />
              <TextField
                label="Peso vendido"
                type="number"
                value={detailForm.weight_sold}
                onChange={(event) =>
                  setDetailForm((current) => ({
                    ...current,
                    weight_sold: event.target.value,
                  }))
                }
              />
              <TextField
                label="Precio por kg"
                type="number"
                value={detailForm.unit_price}
                onChange={(event) =>
                  setDetailForm((current) => ({
                    ...current,
                    unit_price: event.target.value,
                  }))
                }
              />
            </Box>
            {!selectedProduct && productQuery.trim() && !exactProductMatch ? (
              <Button
                variant="outlined"
                onClick={() => void handleCreateProduct()}
                sx={{ alignSelf: "flex-start" }}
              >
                Agregar producto "{productQuery.trim().toUpperCase()}"
              </Button>
            ) : null}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
              <Button variant="contained" onClick={() => void handleSaveDetail()}>
                Agregar fila
              </Button>
            </Stack>
          </Stack>
        </Card>

        <Card sx={cardSx}>
          <Stack spacing={2.5}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1.5}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              <Typography variant="h5">Detalle vendido</Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Box
                  sx={{
                    px: 2,
                    py: 1.25,
                    borderRadius: "18px",
                    border: "1px solid rgba(9, 52, 46, 0.12)",
                    bgcolor: "rgba(246, 249, 251, 0.85)",
                    minWidth: 180,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Peso total vendido
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#09342e", mt: 0.25 }}>
                    {balance.total_weight.toFixed(2)} kg
                  </Typography>
                </Box>
                <Box
                  sx={{
                    px: 2,
                    py: 1.25,
                    borderRadius: "18px",
                    border: "1px solid rgba(110, 38, 30, 0.12)",
                    bgcolor: "rgba(110, 38, 30, 0.06)",
                    minWidth: 180,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Total vendido
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#6e261e", mt: 0.25 }}>
                    {toCurrency(balance.gross_total)}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell>Cajas apoyo</TableCell>
                <TableCell>Peso</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Resultado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupedDetails.map((group) => (
                <>
                  {group.details.length > 1 ? (
                    <TableRow
                      key={`group-${group.productId}`}
                      sx={{
                        "& td": {
                          borderBottom: "1px solid rgba(9, 52, 46, 0.1)",
                          bgcolor: "rgba(246, 249, 251, 0.9)",
                        },
                      }}
                    >
                      <TableCell colSpan={6}>
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={1.5}
                          justifyContent="space-between"
                          alignItems={{ xs: "flex-start", sm: "center" }}
                        >
                          <Box>
                            <Typography variant="subtitle1" sx={{ color: "#09342e" }}>
                              {group.productName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {group.details.length} filas registradas
                            </Typography>
                          </Box>
                          <Button
                            variant="outlined"
                            onClick={() => handleAddVariation(group.productId)}
                          >
                            Agregar variación
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {group.details.map((detail) => {
                    const isEditingRow =
                      detailEditor?.mode === "edit" &&
                      detailEditor.detailId === detail.id;
                    const lineTotalPreview = isEditingRow
                      ? Number(
                          (
                            Number(detailEditor.weight_sold || 0) *
                            Number(detailEditor.unit_price || 0)
                          ).toFixed(2)
                        )
                      : detail.line_total;

                    return (
                      <TableRow key={detail.id}>
                        <TableCell>
                          {group.details.length > 1 ? "" : detail.product_name}
                        </TableCell>
                        <TableCell>
                          {isEditingRow ? (
                            <TextField
                              size="small"
                              type="number"
                              value={detailEditor.boxes_sold}
                              onChange={(event) =>
                                setDetailEditor((current) =>
                                  current && current.mode === "edit"
                                    ? { ...current, boxes_sold: event.target.value }
                                    : current
                                )
                              }
                            />
                          ) : (
                            detail.boxes_sold
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditingRow ? (
                            <TextField
                              size="small"
                              type="number"
                              value={detailEditor.weight_sold}
                              onChange={(event) =>
                                setDetailEditor((current) =>
                                  current && current.mode === "edit"
                                    ? { ...current, weight_sold: event.target.value }
                                    : current
                                )
                              }
                            />
                          ) : (
                            detail.weight_sold
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditingRow ? (
                            <TextField
                              size="small"
                              type="number"
                              value={detailEditor.unit_price}
                              onChange={(event) =>
                                setDetailEditor((current) =>
                                  current && current.mode === "edit"
                                    ? { ...current, unit_price: event.target.value }
                                    : current
                                )
                              }
                            />
                          ) : (
                            toCurrency(detail.unit_price)
                          )}
                        </TableCell>
                        <TableCell>{toCurrency(lineTotalPreview)}</TableCell>
                        <TableCell>
                          {isEditingRow ? (
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                              <Button variant="text" onClick={() => void handleSaveInlineDetail()}>
                                Guardar
                              </Button>
                              <Button variant="text" onClick={resetDetailEditor}>
                                Cancelar
                              </Button>
                            </Stack>
                          ) : (
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                              <Button variant="text" onClick={() => handleEditDetail(detail)}>
                                Editar
                              </Button>
                              <Button
                                variant="text"
                                onClick={() => handleAddVariation(group.productId)}
                              >
                                Agregar variación
                              </Button>
                              <Button
                                variant="text"
                                color="error"
                                onClick={() => void handleDeleteDetail(detail.id)}
                              >
                                Eliminar
                              </Button>
                            </Stack>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {detailEditor?.mode === "variation" &&
                  detailEditor.productId === group.productId ? (
                    <TableRow key={`variation-${group.productId}`}>
                      <TableCell>
                        {group.productName}
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="number"
                          value={detailEditor.boxes_sold}
                          onChange={(event) =>
                            setDetailEditor((current) =>
                              current && current.mode === "variation"
                                ? { ...current, boxes_sold: event.target.value }
                                : current
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="number"
                          value={detailEditor.weight_sold}
                          onChange={(event) =>
                            setDetailEditor((current) =>
                              current && current.mode === "variation"
                                ? { ...current, weight_sold: event.target.value }
                                : current
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="number"
                          value={detailEditor.unit_price}
                          onChange={(event) =>
                            setDetailEditor((current) =>
                              current && current.mode === "variation"
                                ? { ...current, unit_price: event.target.value }
                                : current
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {toCurrency(
                          Number(
                            (
                              Number(detailEditor.weight_sold || 0) *
                              Number(detailEditor.unit_price || 0)
                            ).toFixed(2)
                          )
                        )}
                      </TableCell>
                      <TableCell>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                          <Button variant="text" onClick={() => void handleSaveInlineDetail()}>
                            Guardar
                          </Button>
                          <Button variant="text" onClick={resetDetailEditor}>
                            Cancelar
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </>
              ))}
              {!groupedDetails.length ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography color="text.secondary">
                      El detalle todavía está vacío. Agrega la primera fila de producto.
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
