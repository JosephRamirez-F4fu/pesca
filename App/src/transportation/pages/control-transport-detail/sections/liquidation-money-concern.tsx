import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useVehicleRoute } from "../../../context/vehicle-route";
import { useVehicleRouteMoney } from "../../../context/vehicle_route_money";
import {
  VehicleRouteMoneyDto,
  VehicleRouteMoneyResDto,
} from "../../../dto/vehicle_route_money";
import { CrudModalCard } from "../../../../shared/components/crud-modal-card";
import { useCrudDialog } from "../../../../shared/hooks/useCrudDialog";
import {
  ActionButton,
  DangerButton,
  fieldSx,
  primaryButtonSx,
  SectionSurface,
  SummaryPill,
  tableWrapSx,
} from "./detail-surface";

export const LiquidationMoneyConcern = () => {
  const { routeSelected } = useVehicleRoute();
  const {
    createRouteMoney,
    deleteRouteMoney,
    updateRouteMoney,
    routesMoney,
    routeMoneySelected,
    setRouteMoneySelected,
  } = useVehicleRouteMoney();
  const [money, setMoney] = useState<VehicleRouteMoneyDto>({
    money: 0,
    givenby: "",
    description: "",
    type: "",
    id_vehicle_route: routeSelected?.id || 0,
  });
  const { open, editMode, openCreate, openEdit, closeDialog } = useCrudDialog();

  const optionsGivenBy = ["ANA", "JUAN", "CHICHO", "NATALY"];
  const optionsDescription = ["SALIDA", "RETORNO"];
  const optionsType = ["EFECTIVO", "DEPOSITO"];

  const handleClose = () => {
    setRouteMoneySelected(null);
    setMoney({
      money: 0,
      givenby: "",
      id_vehicle_route: routeSelected?.id || 0,
      description: "",
      type: "",
    });
  };

  const handleSubmit = async () => {
    if (!routeSelected) return;

    if (!routeMoneySelected) {
      await createRouteMoney(money);
    } else {
      await updateRouteMoney(routeMoneySelected.id, money);
    }

    handleClose();
  };

  const handleEdit = (selectedMoney: VehicleRouteMoneyResDto) => {
    openEdit(() => {
      setMoney(selectedMoney);
      setRouteMoneySelected(selectedMoney);
    });
  };

  return (
    <SectionSurface
      eyebrow="Flujo entregado"
      title="Dinero dado"
      subtitle="Mantiene visibles las entregas de salida y retorno sin sobrecargar la lectura principal."
      action={
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
          <SummaryPill label="Movimientos" value={String(routesMoney.length)} />
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
              <TableCell>Monto</TableCell>
              <TableCell>Entregado por</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routesMoney.map((currentMoney) => (
              <TableRow key={currentMoney.id}>
                <TableCell>
                  <Typography sx={{ fontWeight: 700 }}>
                    {currentMoney.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: 700 }}>
                    S/ {currentMoney.money.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>{currentMoney.givenby}</TableCell>
                <TableCell>
                  <Chip
                    label={currentMoney.type}
                    sx={{
                      borderRadius: 999,
                      backgroundColor: "rgba(15, 124, 120, 0.08)",
                      color: "#0f3d3e",
                      fontWeight: 700,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ width: 1, minWidth: 128 }}>
                  <Stack spacing={1}>
                    <ActionButton fullWidth onClick={() => handleEdit(currentMoney)}>
                      Editar
                    </ActionButton>
                    <DangerButton
                      fullWidth
                      onClick={() => void deleteRouteMoney(currentMoney.id)}
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
        title={editMode ? "Editar Dinero Dado" : "Anadir Dinero Dado"}
        submitLabel={editMode ? "Actualizar" : "Guardar"}
        onClose={() => closeDialog(handleClose)}
        onSubmit={() => void handleSubmit()}
      >
        <Autocomplete
          options={optionsDescription}
          value={money.description}
          freeSolo
          onChange={(_, value) =>
            setMoney({ ...money, description: value || "" })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Descripcion"
              sx={fieldSx}
              required
              onChange={(event) =>
                setMoney({
                  ...money,
                  description: event.target.value.toUpperCase(),
                })
              }
            />
          )}
        />
        <Autocomplete
          options={optionsGivenBy}
          value={money.givenby}
          freeSolo
          onChange={(_, value) => setMoney({ ...money, givenby: value || "" })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Entregado por"
              sx={fieldSx}
              required
              onChange={(event) =>
                setMoney({
                  ...money,
                  givenby: event.target.value.toUpperCase(),
                })
              }
            />
          )}
        />
        <TextField
          label="Monto"
          type="number"
          sx={fieldSx}
          value={money.money}
          onChange={(event) =>
            setMoney({ ...money, money: Number(event.target.value) || 0 })
          }
          required
        />
        <Autocomplete
          options={optionsType}
          value={money.type}
          freeSolo
          onChange={(_, value) => setMoney({ ...money, type: value || "" })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tipo"
              sx={fieldSx}
              required
              onChange={(event) =>
                setMoney({
                  ...money,
                  type: event.target.value.toUpperCase(),
                })
              }
            />
          )}
        />
      </CrudModalCard>
    </SectionSurface>
  );
};
