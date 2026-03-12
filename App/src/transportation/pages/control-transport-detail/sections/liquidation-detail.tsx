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
    <Box>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6">Detalles de la Ruta</Typography>
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Fecha de Inicio"
            type="date"
            disabled={!isEdit}
            value={detail.dateInit}
            onChange={(event) =>
              setDetail({ ...detail, dateInit: event.target.value })
            }
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Fecha de Fin"
            type="date"
            disabled={!isEdit}
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
                label="Punto de Carga"
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
                label="Quien Liquida"
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
            label="Peajes Salida"
            type="number"
            disabled={!isEdit}
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
            label="Peajes Retorno"
            type="number"
            disabled={!isEdit}
            value={detail.taxes_out.toFixed(2)}
            onChange={(event) =>
              setDetail({
                ...detail,
                taxes_out: Number(event.target.value) || 0,
              })
            }
            required
          />
          <FormControl fullWidth disabled={!isEdit}>
            <InputLabel id="change-given" shrink>
              Vuelto Fue Entregado
            </InputLabel>
            <Switch
              id="changeGiven"
              checked={detail.changeGiven}
              onChange={() =>
                setDetail({
                  ...detail,
                  changeGiven: !detail.changeGiven,
                })
              }
            />
          </FormControl>
          <FormControl fullWidth disabled={!isEdit}>
            <InputLabel id="next-route">Enlazar a Viaje con Fecha</InputLabel>
            <Select
              labelId="vehicle-select-label"
              label="Vehiculo"
              value={detail.id_next_route === null ? "" : detail.id_next_route}
              onChange={(event) =>
                setDetail({
                  ...detail,
                  id_next_route: (event.target.value as number) || null,
                })
              }
            >
              <MenuItem value="">Ninguno</MenuItem>
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
          {isEdit ? (
            <Button variant="contained" type="submit">
              Guardar
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setIsEdit(true)}>
              Editar
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
};
