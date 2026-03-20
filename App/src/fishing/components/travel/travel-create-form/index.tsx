import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  alpha,
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTravel } from "./../../../context/travel/useContext";
import { travelDto } from "./../../../domain/dto/travel.dto";
import { toIsoDateString } from "../../../../shared/utils/date";

const defaultValues: travelDto = {
  code: "",
  oil_charge: 0,
  oil_charger_price: 0,
  oil_consume: 0,
  oil_consume_price: 0,
  provisions_cost: 0,
  gas_cylinder_cost: 0,
  createdAt: "",
  is_concluded: false,
  fishing_date_canceled: null,
  oil_date_canceled: null,
  oil_remaining: 0,
  oil_vehicle: 0,
  oil_vehicle_price: 0,
  oil_vehicle_date_canceled: null,
  id_boat: 1,
};

export interface TravelCreateFormProps {
  close: () => void;
}

export const TravelCreateForm = ({ close }: TravelCreateFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<travelDto>({
    defaultValues,
  });
  const { create } = useTravel();
  const onSubmit = async (data: travelDto) => {
    await create({ ...data, createdAt: toIsoDateString(data.createdAt) ?? "" });
    close();
  };

  const oilCharge = watch("oil_charge");
  const oilConsume = watch("oil_consume");
  const defaultPricePerUnit = 680;

  useEffect(() => {
    setValue("oil_charger_price", oilCharge * defaultPricePerUnit);
  }, [oilCharge, setValue]);

  useEffect(() => {
    setValue("oil_consume_price", oilConsume * defaultPricePerUnit);
  }, [oilConsume, setValue]);

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: { xs: 2.5, md: 4 },
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        overflowY: "auto",
        maxHeight: "80vh",
      }}
    >
      <Card
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: "none",
          bgcolor: alpha("#0f3d3e", 0.04),
        }}
      >
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Identidad del viaje
            </Typography>
            <Typography color="text.secondary">
              Define el código interno y la fecha base del registro.
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Código"
            {...register("code", {
              required: true,
              onChange: (e) => setValue("code", e.target.value.toUpperCase()),
            })}
            error={!!errors.code}
            helperText={errors.code ? "Código es requerido" : ""}
          />
          <TextField
            fullWidth
            type="date"
            {...register("createdAt")}
            error={!!errors.createdAt}
            helperText={errors.createdAt ? "Fecha es requerida" : ""}
          />
        </Stack>
      </Card>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2,
          width: "100%",
        }}
      >
        <Card
          sx={{
            p: 3,
            borderRadius: 4,
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            bgcolor: alpha("#ffffff", 0.75),
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            Carga inicial
          </Typography>
          <TextField
            fullWidth
            label="Galones Petroleo Salida"
            type="number"
            {...register("oil_charge", { valueAsNumber: true })}
            error={!!errors.oil_charge}
            helperText={
              errors.oil_charge ? "Petroleo Cargado es requerido" : ""
            }
          />
          <Controller
            name="oil_charger_price"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Gasto Petroleo Salida"
                type="number"
                {...field}
                error={!!errors.oil_charger_price}
                helperText={
                  errors.oil_charger_price ? "Costo es requerido" : ""
                }
              />
            )}
          />
        </Card>

        <Card
          sx={{
            p: 3,
            borderRadius: 4,
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            bgcolor: alpha("#ffffff", 0.75),
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            Consumo del viaje
          </Typography>
          <TextField
            fullWidth
            label="Petroleo Consumido"
            type="number"
            {...register("oil_consume", { valueAsNumber: true })}
            error={!!errors.oil_consume}
            helperText={
              errors.oil_consume ? "Petroleo Consumido es requerido" : ""
            }
          />
          <Controller
            name="oil_consume_price"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Gasto Petrolo Consumido"
                type="number"
                {...field}
                error={!!errors.oil_consume_price}
                helperText={
                  errors.oil_consume_price ? "Costo es requerido" : ""
                }
              />
            )}
          />
        </Card>

        <Card
          sx={{
            p: 3,
            borderRadius: 4,
            boxShadow: "none",
            bgcolor: alpha("#ffffff", 0.75),
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
            Abastecimiento
          </Typography>
          <TextField
            fullWidth
            label="Viveres"
            type="number"
            {...register("provisions_cost", { valueAsNumber: true })}
            error={!!errors.provisions_cost}
            helperText={
              errors.provisions_cost ? "Proviciones es requerido" : ""
            }
          />
        </Card>

        <Card
          sx={{
            p: 3,
            borderRadius: 4,
            boxShadow: "none",
            bgcolor: alpha("#ffffff", 0.75),
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
            Servicios
          </Typography>
          <TextField
            fullWidth
            label="Balon de Gas"
            type="number"
            {...register("gas_cylinder_cost", { valueAsNumber: true })}
            error={!!errors.gas_cylinder_cost}
            helperText={
              errors.gas_cylinder_cost ? "Balon de Gas es requerido" : ""
            }
          />
        </Card>
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 1, alignSelf: "flex-end", minWidth: 180, borderRadius: 99 }}
      >
        Registrar
      </Button>
    </Box>
  );
};
