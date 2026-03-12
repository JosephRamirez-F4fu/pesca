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
import { useFishing } from "../../../../context/fishing/useContext";
import { FishingDto, FishingResDto } from "../../../../domain/dto/fishing.dto";
import { useRecentOptions } from "../hooks/useRecentOptions";
import { toCurrency } from "../utils";

const RECENT_FISH_KEY = "recent_fish_names";

export const FishingTravelCard = () => {
  const { fishings, create, update, remove } = useFishing();
  const [selectedFishing, setSelectedFishing] = useState<FishingResDto | null>(
    null
  );
  const { options: fishOptions, saveOption } = useRecentOptions(RECENT_FISH_KEY);
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      fish: "",
      weight: 0,
      boxes: 0,
      price: 0,
      id_travel: 0,
    },
  });

  const onSubmit = async (data: FishingDto) => {
    if (selectedFishing) {
      await update(selectedFishing.id, data);
      setSelectedFishing(null);
    } else {
      await create(data);
    }

    saveOption(data.fish || "");
    reset();
  };

  const handleEdit = (fishing: FishingResDto) => {
    setSelectedFishing(fishing);
    setValue("fish", fishing.fish);
    setValue("weight", fishing.weight);
    setValue("boxes", fishing.boxes);
    setValue("price", fishing.price);
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
        Pesca
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
          {selectedFishing ? "Editar Pesca" : "Nueva Pesca"}
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
            options={fishOptions}
            value={watch("fish") || ""}
            onInputChange={(_event: SyntheticEvent, value: string) => {
              setValue("fish", (value || "").toUpperCase());
            }}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField {...params} label="Pescado" required />
            )}
          />
          <TextField
            {...register("weight", { valueAsNumber: true })}
            label="Peso x Caja"
            type="number"
            required
          />
          <TextField
            {...register("boxes", { valueAsNumber: true })}
            label="Cajas"
            type="number"
            required
          />
          <TextField
            {...register("price", { valueAsNumber: true })}
            label="Precio x Kg"
            type="number"
            inputProps={{ step: 0.01 }}
            required
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ gridColumn: { md: "1 / -1" } }}>
            <Button variant="contained" type="submit" sx={{ borderRadius: 99 }}>
              {selectedFishing ? "Actualizar" : "Guardar"}
            </Button>
            {selectedFishing && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  reset();
                  setSelectedFishing(null);
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
            <TableCell>Pescado</TableCell>
            <TableCell>Peso x Caja</TableCell>
            <TableCell>Cajas</TableCell>
            <TableCell>Precio x Kg</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fishings.map((fishing) => (
            <TableRow key={fishing.id}>
              <TableCell>{fishing.fish}</TableCell>
              <TableCell>{fishing.weight}</TableCell>
              <TableCell>{fishing.boxes}</TableCell>
              <TableCell>{toCurrency(fishing.price)}</TableCell>
              <TableCell>
                {toCurrency(fishing.weight * fishing.boxes * fishing.price)}
              </TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => handleEdit(fishing)}>
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => void remove(fishing.id)}
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
