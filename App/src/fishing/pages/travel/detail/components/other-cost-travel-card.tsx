import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SyntheticEvent } from "react";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import {
  alpha,
  Box,
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useOtherCost } from "../../../../context/other-cost/useContext";
import {
  OtherCostTravelDto,
  OtherCostTravelResDto,
} from "../../../../domain/dto/other_cost_travel.dto";
import { useRecentOptions } from "../hooks/useRecentOptions";
import { toCurrency } from "../utils";

const RECENT_COST_KEY = "recent_other_cost_descriptions";

export const OtherCostTravelCard = () => {
  const { otherCostTravels, create, update, remove } = useOtherCost();
  const [selectedCost, setSelectedCost] =
    useState<OtherCostTravelResDto | null>(null);
  const { options: costOptions, saveOption } = useRecentOptions(RECENT_COST_KEY);
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      id_travel: 0,
      description: "",
      is_added: false,
      price: 0,
    },
  });

  const onSubmit = async (data: OtherCostTravelDto) => {
    if (selectedCost) {
      await update(selectedCost.id, data);
      setSelectedCost(null);
    } else {
      await create(data);
    }

    saveOption(data.description || "");
    reset();
  };

  const handleEdit = (cost: OtherCostTravelResDto) => {
    setSelectedCost(cost);
    setValue("description", cost.description);
    setValue("price", cost.price);
    setValue("is_added", cost.is_added);
  };

  return (
    <Card
      sx={{
        p: { xs: 2, sm: 2.5, md: 3 },
        boxShadow: 3,
        borderRadius: 3,
        width: "100%",
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Otros costos del viaje
      </Typography>
      <Card
        sx={{
          p: { xs: 2, sm: 2.5 },
          boxShadow: 0,
          borderRadius: 3,
          mt: 2,
          mb: 3,
          bgcolor: alpha("#0f3d3e", 0.04),
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {selectedCost ? "Editar Costo" : "Nuevo Costo"}
        </Typography>
        <Box
          component="form"
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 1.5,
          }}
        >
          <Autocomplete
            freeSolo
            options={costOptions}
            value={watch("description") || ""}
            onInputChange={(_event: SyntheticEvent, value: string) => {
              setValue("description", (value || "").toUpperCase());
            }}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField {...params} label="Descripción" required />
            )}
          />
          <TextField
            {...register("description", {
              onChange: (event) =>
                setValue("description", event.target.value.toUpperCase()),
            })}
            label="Descripción"
            required
            sx={{ display: "none" }}
          />
          <TextField
            {...register("price", { valueAsNumber: true })}
            label="Costo"
            type="number"
            required
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ gridColumn: { md: "1 / -1" } }}>
            {watch("is_added") ? (
              <Button
                variant="contained"
                color="error"
                onClick={() => setValue("is_added", false)}
                sx={{ borderRadius: 99 }}
              >
                Quitar de la división
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={() => setValue("is_added", true)}
                sx={{ borderRadius: 99 }}
              >
                Agregar a la división
              </Button>
            )}
            <Button variant="contained" type="submit" sx={{ borderRadius: 99 }}>
              {selectedCost ? "Actualizar" : "Guardar"}
            </Button>
            {selectedCost && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  reset();
                  setSelectedCost(null);
                }}
                sx={{ borderRadius: 99 }}
              >
                Cancelar
              </Button>
            )}
          </Stack>
        </Box>
      </Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell>Costo</TableCell>
            <TableCell>División</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {otherCostTravels.map((otherCost) => (
            <TableRow key={otherCost.id}>
              <TableCell>{otherCost.description}</TableCell>
              <TableCell>{toCurrency(otherCost.price)}</TableCell>
              <TableCell>
                {otherCost.is_added ? "A la Division" : "No a la Division"}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleEdit(otherCost)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => void remove(otherCost.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
