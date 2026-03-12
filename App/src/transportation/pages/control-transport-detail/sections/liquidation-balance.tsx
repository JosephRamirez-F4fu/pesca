import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
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
    <Box>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6">Balanza</Typography>
        <Button variant="contained" onClick={() => openCreate()}>
          Añadir
        </Button>
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
                <TableCell>{currentBalance.place}</TableCell>
                <TableCell>{currentBalance.balance}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(currentBalance)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => void deleteBalance(currentBalance.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <CrudModalCard
        open={open}
        title={editMode ? "Editar Balance" : "Añadir Balance"}
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
          value={balance.balance}
          onChange={(event) =>
            setBalance({ ...balance, balance: Number(event.target.value) || 0 })
          }
          required
        />
      </CrudModalCard>
    </Box>
  );
};
