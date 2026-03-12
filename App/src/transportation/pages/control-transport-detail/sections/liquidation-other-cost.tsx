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
import { useRoutesOtherCost } from "../../../context/other-cost";
import {
  VehicleRouteOtherCostDto,
  VehicleRouteOtherCostResDto,
} from "../../../dto/other-cost";
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
    <SectionSurface
      eyebrow="Gastos auxiliares"
      title="Otros gastos"
      subtitle="Deja separados los costos extraordinarios para que el cierre muestre con claridad que se desvia del recorrido."
      action={
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
          <SummaryPill label="Items" value={String(otherCosts.length)} />
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
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {otherCosts.map((currentCost) => (
              <TableRow key={currentCost.id}>
                <TableCell>
                  <Typography sx={{ fontWeight: 700 }}>
                    {currentCost.description}
                  </Typography>
                </TableCell>
                <TableCell>S/ {currentCost.price.toFixed(2)}</TableCell>
                <TableCell sx={{ width: 1, minWidth: 128 }}>
                  <Stack spacing={1}>
                    <ActionButton fullWidth onClick={() => handleEdit(currentCost)}>
                      Editar
                    </ActionButton>
                    <DangerButton fullWidth onClick={() => void deleteCost(currentCost.id)}>
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
        title={editMode ? "Editar Otro Gasto" : "Anadir Otro Gasto"}
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
              label="Descripcion"
              sx={fieldSx}
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
          sx={fieldSx}
          value={cost.price}
          onChange={(event) =>
            setCost({ ...cost, price: Number(event.target.value) || 0 })
          }
          required
        />
      </CrudModalCard>
    </SectionSurface>
  );
};
