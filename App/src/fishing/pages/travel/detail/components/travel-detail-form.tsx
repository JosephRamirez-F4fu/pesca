import { useEffect, useState } from "react";
import {
  alpha,
  Box,
  Button,
  Card,
  Stack,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTravel } from "../../../../context/travel/useContext";
import { travelResDto } from "../../../../domain/dto/travel.dto";
import { useTankPrice } from "../../../../context/tank-price/useContext";
import {
  formatCreatedAtToISODate,
  formatToISODate,
  formatToInputDate,
  toCurrency,
} from "../utils";

const defaultValues: Partial<travelResDto> = {
  code: "",
  oil_charge: 0,
  oil_charger_price: 0,
  oil_consume: 0,
  oil_consume_price: 0,
  provisions_cost: 0,
  gas_cylinder_cost: 0,
  createdAt: "",
  oil_date_canceled: null,
  oil_remaining: 0,
  fishing_date_canceled: null,
  is_concluded: false,
  oil_vehicle: 0,
  oil_vehicle_price: 0,
  oil_vehicle_date_canceled: null,
};

export const TravelDetailForm = () => {
  const { travelSelected, update, SetTravelSelected } = useTravel();
  const [isEditing, setIsEditing] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const { price: tankPrice } = useTankPrice();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<travelResDto>({
    defaultValues: defaultValues as travelResDto,
  });

  const oilCharge = watch("oil_charge");
  const oilConsume = watch("oil_consume");

  useEffect(() => {
    setValue("oil_charger_price", oilCharge * tankPrice);
  }, [oilCharge, setValue, tankPrice]);

  useEffect(() => {
    setValue("oil_consume_price", oilConsume * tankPrice);
  }, [oilConsume, setValue, tankPrice]);

  useEffect(() => {
    if (!travelSelected) {
      return;
    }

    reset({
      ...travelSelected,
      createdAt: travelSelected.createdAt
        ? formatToInputDate(travelSelected.createdAt)
        : "",
      oil_date_canceled: travelSelected.oil_date_canceled
        ? formatToInputDate(travelSelected.oil_date_canceled)
        : "",
      fishing_date_canceled: travelSelected.fishing_date_canceled
        ? formatToInputDate(travelSelected.fishing_date_canceled)
        : "",
    });

    setTotalCost(
      travelSelected.oil_consume_price +
        travelSelected.provisions_cost +
        travelSelected.gas_cylinder_cost
    );
  }, [reset, travelSelected]);

  const onSubmit = async (data: travelResDto) => {
    if (!travelSelected) {
      return;
    }

    const nextTravel = {
      ...data,
      id: travelSelected.id,
      is_concluded:
        data.oil_date_canceled != null && data.fishing_date_canceled != null,
      createdAt: formatCreatedAtToISODate(data.createdAt),
      oil_date_canceled: formatToISODate(data.oil_date_canceled),
      fishing_date_canceled: formatToISODate(data.fishing_date_canceled),
    };

    await update(travelSelected.id, nextTravel);
    SetTravelSelected({ ...travelSelected, ...nextTravel });
    setIsEditing(false);
  };

  if (!travelSelected) {
    return (
      <Typography variant="h6">No hay datos de viaje seleccionados.</Typography>
    );
  }

  return (
    <Box>
      {travelSelected.is_concluded && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
            bgcolor: "primary.light",
          }}
        >
          <Typography variant="h4" color="white" sx={{ fontWeight: "bold" }}>
            Concluido
          </Typography>
        </Box>
      )}
      <Card
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          boxShadow: 3,
          borderRadius: 3,
          width: "100%",
        }}
      >
        <Stack spacing={2.5}>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", lg: "center" }}
          >
            <Box>
              <Typography variant="overline" sx={{ letterSpacing: "0.18em", color: "primary.main" }}>
                Viaje
              </Typography>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 800 }}>
                Detalle operativo
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                Lancha: {travelSelected.boat?.name || "No asignada"}
              </Typography>
            </Box>
            <TextField
              label="Gasto de viaje"
              value={toCurrency(totalCost)}
              InputProps={{ style: { color: "black", fontWeight: "bold" } }}
              disabled
              sx={{
                minWidth: { xs: "100%", sm: 240 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: alpha("#0f3d3e", 0.04),
                },
              }}
            />
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "repeat(2, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            <Card sx={{ p: 2.5, borderRadius: 3, boxShadow: "none", bgcolor: alpha("#0f3d3e", 0.04) }}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  Identidad y salida
                </Typography>
                <TextField
                  {...register("code", {
                    required: true,
                    onChange: (event) =>
                      setValue("code", event.target.value.toUpperCase()),
                  })}
                  label="Código"
                  InputProps={{ style: { color: "black", fontWeight: "bold" } }}
                  slotProps={{ inputLabel: { shrink: true } }}
                  disabled={!isEditing}
                />
                <TextField
                  {...register("createdAt", { valueAsDate: true })}
                  label="Fecha"
                  type="date"
                  InputProps={{ style: { color: "black", fontWeight: "bold" } }}
                  slotProps={{ inputLabel: { shrink: true } }}
                  disabled={!isEditing}
                />
                <TextField
                  {...register("oil_charge", { valueAsNumber: true })}
                  label="Galones de Petróleo Salida"
                  type="number"
                  InputProps={{ style: { color: "black", fontWeight: "bold" } }}
                  disabled={!isEditing}
                />
                <Controller
                  name="oil_charger_price"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Costo de Petróleo Salida"
                      type="number"
                      {...field}
                      error={!!errors.oil_charger_price}
                      helperText={
                        errors.oil_charger_price ? "Costo es requerido" : ""
                      }
                      InputProps={{
                        style: { color: "black", fontWeight: "bold" },
                        startAdornment: (
                          <InputAdornment position="start">S/</InputAdornment>
                        ),
                      }}
                      disabled={!isEditing}
                    />
                  )}
                />
                <TextField
                  {...register("oil_date_canceled", { valueAsDate: true })}
                  label="Fecha de Cancelación de Petróleo Salida"
                  type="date"
                  InputProps={{ style: { color: "black", fontWeight: "bold" } }}
                  slotProps={{ inputLabel: { shrink: true } }}
                  disabled={!isEditing}
                />
              </Stack>
            </Card>

            <Card sx={{ p: 2.5, borderRadius: 3, boxShadow: "none", bgcolor: alpha("#0f3d3e", 0.04) }}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  Consumo y cierre
                </Typography>
                <TextField
                  {...register("oil_consume", { valueAsNumber: true })}
                  label="Galones de Consumo de Petróleo"
                  type="number"
                  InputProps={{ style: { color: "black", fontWeight: "bold" } }}
                  disabled={!isEditing}
                />
                <Controller
                  name="oil_consume_price"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Costo de Consumo de Petróleo"
                      type="number"
                      {...field}
                      error={!!errors.oil_consume_price}
                      helperText={
                        errors.oil_consume_price ? "Costo es requerido" : ""
                      }
                      InputProps={{
                        style: { color: "black", fontWeight: "bold" },
                        startAdornment: (
                          <InputAdornment position="start">S/</InputAdornment>
                        ),
                      }}
                      disabled={!isEditing}
                    />
                  )}
                />
                <TextField
                  fullWidth
                  label="Petróleo que queda"
                  {...register("oil_remaining", { valueAsNumber: true })}
                  type="number"
                  InputProps={{ style: { color: "black", fontWeight: "bold" } }}
                  disabled={!isEditing}
                />
                <TextField
                  {...register("provisions_cost", { valueAsNumber: true })}
                  label="Víveres"
                  type="number"
                  InputProps={{ style: { color: "black", fontWeight: "bold" } }}
                  disabled={!isEditing}
                />
                <TextField
                  {...register("gas_cylinder_cost", { valueAsNumber: true })}
                  label="Balón de Gas"
                  type="number"
                  InputProps={{ style: { color: "black", fontWeight: "bold" } }}
                  disabled={!isEditing}
                />
                <TextField
                  {...register("fishing_date_canceled", { valueAsDate: true })}
                  label="Fecha de Cancelación de la Pesca"
                  type="date"
                  InputProps={{ style: { color: "black", fontWeight: "bold" } }}
                  slotProps={{ inputLabel: { shrink: true } }}
                  disabled={!isEditing}
                />
              </Stack>
            </Card>
          </Box>

          {isEditing ? (
            <Button
              variant="contained"
              sx={{ alignSelf: "flex-end", minWidth: 160, borderRadius: 99 }}
              onClick={() => void handleSubmit(onSubmit)()}
            >
              Guardar cambios
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ alignSelf: "flex-end", minWidth: 140, borderRadius: 99 }}
              onClick={() => setIsEditing(true)}
              type="button"
            >
              Editar
            </Button>
          )}
        </Stack>
      </Card>
    </Box>
  );
};
