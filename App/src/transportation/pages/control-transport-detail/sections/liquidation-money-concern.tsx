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
import { useVehicleRouteMoney } from "../../../context/vehicle_route_money";
import {
  VehicleRouteMoneyDto,
  VehicleRouteMoneyResDto,
} from "../../../dto/vehicle_route_money";
import { CrudModalCard } from "../../../../shared/components/crud-modal-card";
import { useCrudDialog } from "../../../../shared/hooks/useCrudDialog";

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
    <Box>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6">Dinero Dado</Typography>
        <Button variant="contained" onClick={() => openCreate()}>
          Añadir
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Entregado Por</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routesMoney.map((currentMoney) => (
              <TableRow key={currentMoney.id}>
                <TableCell>{currentMoney.description}</TableCell>
                <TableCell>{currentMoney.money}</TableCell>
                <TableCell>{currentMoney.givenby}</TableCell>
                <TableCell>{currentMoney.type}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(currentMoney)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => void deleteRouteMoney(currentMoney.id)}
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
        title={editMode ? "Editar Dinero Dado" : "Añadir Dinero Dado"}
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
              label="Descripción"
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
              label="Entregado Por"
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
    </Box>
  );
};
