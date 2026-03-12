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
import { useRoutesOtherCost } from "../../../context/other-cost";
import {
  VehicleRouteOtherCostDto,
  VehicleRouteOtherCostResDto,
} from "../../../dto/other-cost";
import { CrudModalCard } from "../../../../shared/components/crud-modal-card";
import { useCrudDialog } from "../../../../shared/hooks/useCrudDialog";

export const LiquidationOtherCost = () => {
  const { routeSelected } = useVehicleRoute();
  const {
    costs: otherCosts,
    createCost,
    deleteCost,
    updateCost,
    costSelected,
    setCostSelected,
  } = useRoutesOtherCost();
  const [cost, setCost] = useState<VehicleRouteOtherCostDto>({
    description: "",
    id_vehicle_route: routeSelected?.id || 0,
    price: 0,
  });
  const { open, editMode, openCreate, openEdit, closeDialog } = useCrudDialog();

  const optionsOtherCost = ["LAVADA", "PESADA", "CALIBRADA LLANTA"];

  const handleClose = () => {
    setCostSelected(null);
    setCost({
      description: "",
      id_vehicle_route: routeSelected?.id || 0,
      price: 0,
    });
  };

  const handleSubmit = async () => {
    if (!routeSelected) return;

    if (editMode) {
      if (!costSelected) return;
      await updateCost(costSelected.id, cost);
    } else {
      await createCost(cost);
    }

    handleClose();
  };

  const handleEdit = (selectedCost: VehicleRouteOtherCostResDto) => {
    openEdit(() => {
      setCost(selectedCost);
      setCostSelected(selectedCost);
    });
  };

  return (
    <Box>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6">Otros Gastos</Typography>
        <Button variant="contained" onClick={() => openCreate()}>
          Añadir
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {otherCosts.map((currentCost) => (
              <TableRow key={currentCost.id}>
                <TableCell>{currentCost.description}</TableCell>
                <TableCell>{currentCost.price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(currentCost)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => void deleteCost(currentCost.id)}
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
        title={editMode ? "Editar Otro Gasto" : "Añadir Otro Gasto"}
        submitLabel={editMode ? "Actualizar" : "Guardar"}
        onClose={() => closeDialog(handleClose)}
        onSubmit={() => void handleSubmit()}
      >
        <Autocomplete
          options={optionsOtherCost}
          value={cost.description}
          freeSolo
          onChange={(_, value) => setCost({ ...cost, description: value || "" })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Descripción"
              required
              onChange={(event) =>
                setCost({
                  ...cost,
                  description: event.target.value.toUpperCase(),
                })
              }
            />
          )}
        />
        <TextField
          label="Precio"
          type="number"
          value={cost.price}
          onChange={(event) =>
            setCost({ ...cost, price: Number(event.target.value) || 0 })
          }
          required
        />
      </CrudModalCard>
    </Box>
  );
};
