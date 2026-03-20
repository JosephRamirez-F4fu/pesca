import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
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
import { useRouteBalance } from "../../../context/vehicle_route_balance";
import {
  VehicleRouteBalanceDto,
  VehicleRouteBalanceResDto,
} from "../../../dto/vehicle_route_balance";
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

export const LiquidationBalance = () => {
  const { routeSelected } = useVehicleRoute();
  const {
    vehicleRouteBalance,
    createVehicleRouteBalance: createBalance,
    deleteVehicleRouteBalance: deleteBalance,
    vehicleRouteBalanceSelected,
    updateVehicleRouteBalance,
    setVehicleRouteBalanceSelected,
  } = useRouteBalance();
  const [balance, setBalance] = useState<VehicleRouteBalanceDto>({
    balance: 0,
    place: "",
    id_vehicle_route: routeSelected?.id || 0,
  });
  const { open, editMode, openCreate, openEdit, closeDialog } = useCrudDialog();

  const optionsPlace = ["SULLANA", "CHICAMA", "ANCON"];

  const handleClose = () => {
    setVehicleRouteBalanceSelected(null);
    setBalance({
      balance: 0,
      place: "",
      id_vehicle_route: routeSelected?.id || 0,
    });
  };

  const handleSubmit = async () => {
    if (!routeSelected) return;

    if (!editMode) {
      await createBalance(balance);
    } else {
      if (!vehicleRouteBalanceSelected) return;
      await updateVehicleRouteBalance(vehicleRouteBalanceSelected.id, balance);
    }

    handleClose();
  };

  const handleEdit = (selectedBalance: VehicleRouteBalanceResDto) => {
    openEdit(() => {
      setBalance(selectedBalance);
      setVehicleRouteBalanceSelected(selectedBalance);
    });
  };

  return (
    <SectionSurface
      eyebrow="Pesajes"
      title="Balanza"
      subtitle="Agrupa cobros por punto para que el resumen final se lea rapido y sin duplicar contexto."
      action={
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
          <SummaryPill label="Registros" value={String(vehicleRouteBalance.length)} />
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
              <TableCell>Lugar</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleRouteBalance.map((currentBalance) => (
              <TableRow key={currentBalance.id}>
                <TableCell>
                  <Typography sx={{ fontWeight: 700 }}>
                    {currentBalance.place}
                  </Typography>
                </TableCell>
                <TableCell>S/ {currentBalance.balance.toFixed(2)}</TableCell>
                <TableCell sx={{ width: 1, minWidth: 128 }}>
                  <Stack spacing={1}>
                    <ActionButton fullWidth onClick={() => handleEdit(currentBalance)}>
                      Editar
                    </ActionButton>
                    <DangerButton
                      fullWidth
                      onClick={() => void deleteBalance(currentBalance.id)}
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
        title={editMode ? "Editar Balance" : "Anadir Balance"}
        submitLabel={editMode ? "Actualizar" : "Guardar"}
        onClose={() => closeDialog(handleClose)}
        onSubmit={() => void handleSubmit()}
      >
        <Autocomplete
          options={optionsPlace}
          value={balance.place}
          freeSolo
          onChange={(_, value) => setBalance({ ...balance, place: value || "" })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Lugar"
              sx={fieldSx}
              required
              onChange={(event) =>
                setBalance({
                  ...balance,
                  place: event.target.value.toUpperCase(),
                })
              }
            />
          )}
        />
        <TextField
          label="Monto"
          type="number"
          sx={fieldSx}
          value={balance.balance}
          onChange={(event) =>
            setBalance({ ...balance, balance: Number(event.target.value) || 0 })
          }
          required
        />
      </CrudModalCard>
    </SectionSurface>
  );
};
