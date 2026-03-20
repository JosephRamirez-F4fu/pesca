import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { parseISO } from "date-fns";
import { useVehicleRoute } from "../../../context/vehicle-route";
import { useRouteDetail } from "../../../context/vehicle_route_detail";
import { VehicleRouteDetailResDto } from "../../../dto/vehicle_route_detail";
import {
  formatIsoDate,
  formatIsoDateForInput,
  toIsoDateString,
} from "../../../../shared/utils/date";
import {
  fieldSx,
  primaryButtonSx,
  SectionSurface,
  SummaryPill,
} from "./detail-surface";

export const LiquidationDetail = () => {
  const { routes, routeSelected } = useVehicleRoute();
  const { routeDetail, updateRoute } = useRouteDetail();
  const [detail, setDetail] = useState<VehicleRouteDetailResDto | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const optionsDestiny = ["VENTANILLA", "VILLAMARIA", "PIURA"];
  const optionsPointCharge = ["PAITA", "TUMBES", "MATARANI", "ILO", "MORRO"];
  const optionsWhoDestination = ["ANA", "NATALY"];

  useEffect(() => {
    if (!routeDetail) return;
    setDetail({
      ...routeDetail,
      dateInit: formatIsoDateForInput(routeDetail.dateInit),
      dateEnd: formatIsoDateForInput(routeDetail.dateEnd),
    });
  }, [routeDetail]);

  const handleDateShow = (date: string | null) =>
    formatIsoDate(date, "dd-MM-yyyy");

  const handleDateNumber = (date: string) => {
    const time = parseISO(date.split("T")[0]).getTime();
    return Number.isNaN(time) ? 0 : time;
  };

  const handleSubmit = async () => {
    if (!detail) return;

    await updateRoute(detail.id, {
      ...detail,
      dateInit: toIsoDateString(detail.dateInit) ?? "",
      dateEnd: toIsoDateString(detail.dateEnd),
    });
    setIsEdit(false);
  };

  if (!detail) {
    return null;
  }

  return (
    <SectionSurface
      eyebrow="Bitacora"
      title="Detalle de la ruta"
      subtitle="Concentra fechas, destino y peajes con una grilla mas estable para editar solo cuando haga falta."
      action={
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
          <SummaryPill
            label="Inicio"
            value={formatIsoDate(detail.dateInit, "dd/MM/yyyy")}
          />
          <SummaryPill
            label="Destino"
            value={detail.destiny || "Pendiente"}
          />
        </Stack>
      }
    >
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
        sx={{
          mt: 2.25,
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
          },
        }}
      >
        <TextField
          label="Fecha de inicio"
          type="date"
          disabled={!isEdit}
          sx={fieldSx}
          value={detail.dateInit}
          onChange={(event) =>
            setDetail({ ...detail, dateInit: event.target.value })
          }
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Fecha de fin"
          type="date"
          disabled={!isEdit}
          sx={fieldSx}
          value={detail.dateEnd}
          onChange={(event) =>
            setDetail({ ...detail, dateEnd: event.target.value })
          }
          InputLabelProps={{ shrink: true }}
        />
        <Autocomplete
          options={optionsPointCharge}
          value={detail.point_charge || ""}
          disabled={!isEdit}
          freeSolo
          onChange={(_, value) =>
            setDetail({ ...detail, point_charge: value || "" })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{ shrink: true }}
              label="Punto de carga"
              sx={fieldSx}
              onChange={(event) =>
                setDetail({
                  ...detail,
                  point_charge: event.target.value.toUpperCase(),
                })
              }
            />
          )}
        />
        <Autocomplete
          options={optionsDestiny}
          value={detail.destiny || ""}
          disabled={!isEdit}
          freeSolo
          onChange={(_, value) =>
            setDetail({ ...detail, destiny: value || "" })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{ shrink: true }}
              label="Destino"
              sx={fieldSx}
              onChange={(event) =>
                setDetail({
                  ...detail,
                  destiny: event.target.value.toUpperCase(),
                })
              }
            />
          )}
        />
        <Autocomplete
          options={optionsWhoDestination}
          value={detail.who_destination || ""}
          disabled={!isEdit}
          freeSolo
          onChange={(_, value) =>
            setDetail({ ...detail, who_destination: value || "" })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{ shrink: true }}
              label="Quien liquida"
              sx={fieldSx}
              onChange={(event) =>
                setDetail({
                  ...detail,
                  who_destination: event.target.value.toUpperCase(),
                })
              }
            />
          )}
        />
        <TextField
          label="Peajes salida"
          type="number"
          disabled={!isEdit}
          sx={fieldSx}
          value={detail.taxes_in.toFixed(2)}
          onChange={(event) =>
            setDetail({
              ...detail,
              taxes_in: Number(event.target.value) || 0,
            })
          }
          required
        />
        <TextField
          label="Peajes retorno"
          type="number"
          disabled={!isEdit}
          sx={fieldSx}
          value={detail.taxes_out.toFixed(2)}
          onChange={(event) =>
            setDetail({
              ...detail,
              taxes_out: Number(event.target.value) || 0,
            })
          }
          required
        />
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            backgroundColor: "rgba(15, 124, 120, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 72,
          }}
        >
          <Box>
            <Typography sx={{ color: "#16324f", fontWeight: 700 }}>
              Vuelto entregado
            </Typography>
            <Typography sx={{ color: "#567170", fontSize: 14 }}>
              Marca si el saldo ya fue cerrado.
            </Typography>
          </Box>
          <Switch
            checked={detail.changeGiven}
            disabled={!isEdit}
            onChange={() =>
              setDetail({
                ...detail,
                changeGiven: !detail.changeGiven,
              })
            }
          />
        </Box>
        <FormControl fullWidth disabled={!isEdit} sx={fieldSx}>
          <Select
            displayEmpty
            value={detail.id_next_route === null ? "" : detail.id_next_route}
            onChange={(event) =>
              setDetail({
                ...detail,
                id_next_route: (event.target.value as number) || null,
              })
            }
          >
            <MenuItem value="">Enlace siguiente viaje</MenuItem>
            {routes
              .filter((route) => {
                return (
                  route.id_vehicle === routeSelected?.id_vehicle &&
                  route.id !== routeSelected?.id &&
                  handleDateNumber(detail.dateInit) <
                    handleDateNumber(route.createdAt)
                );
              })
              .map((route) => (
                <MenuItem
                  key={route.vehicle_route_detail?.id}
                  value={route.vehicle_route_detail?.id}
                >
                  {handleDateShow(route.createdAt)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Box sx={{ gridColumn: { xs: "auto", md: "1 / -1" }, pt: 0.5 }}>
          {isEdit ? (
            <Button sx={primaryButtonSx} type="submit">
              Guardar cambios
            </Button>
          ) : (
            <Button sx={primaryButtonSx} onClick={() => setIsEdit(true)}>
              Editar detalle
            </Button>
          )}
        </Box>
      </Box>
    </SectionSurface>
  );
};
