import { useEffect, useState } from "react";
import { alpha, Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useTravel } from "../../../../context/travel/useContext";
import { formatToISODate, formatToInputDate } from "../utils";

export const VehicleOilCard = () => {
  const { travelSelected, update, SetTravelSelected } = useTravel();
  const [isEditing, setIsEditing] = useState(false);
  const [oilVehicle, setOilVehicle] = useState(0);
  const [canceledDate, setCanceledDate] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (!travelSelected) {
      return;
    }

    setOilVehicle(travelSelected.oil_vehicle);
    setPrice(travelSelected.oil_vehicle_price);
    setCanceledDate(formatToInputDate(travelSelected.oil_vehicle_date_canceled));
  }, [travelSelected]);

  const handleSave = async () => {
    if (!travelSelected) {
      return;
    }

    const nextTravel = {
      ...travelSelected,
      oil_vehicle: oilVehicle,
      oil_vehicle_price: price,
      oil_vehicle_date_canceled: formatToISODate(canceledDate),
    };

    await update(travelSelected.id, nextTravel);
    SetTravelSelected(nextTravel);
    setIsEditing(false);
  };

  if (!travelSelected) {
    return <Typography>No hay viaje seleccionado</Typography>;
  }

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
        Petróleo de Vehículo
      </Typography>
      {travelSelected.oil_vehicle_date_canceled && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
            bgcolor: "primary.light",
            mb: 2,
          }}
        >
          <Typography variant="h4" color="white" sx={{ fontWeight: "bold" }}>
            Cancelado
          </Typography>
        </Box>
      )}
      <Card sx={{ p: 2.5, borderRadius: 3, boxShadow: "none", bgcolor: alpha("#0f3d3e", 0.04) }}>
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 1.5,
          }}
        >
          <TextField
            label="Petróleo de Vehículo"
            value={oilVehicle}
            InputProps={{ style: { color: "black", fontWeight: "bold" } }}
            disabled={!isEditing}
            type="number"
            onChange={(event) => setOilVehicle(Number(event.target.value))}
          />
          <TextField
            label="Gasto de Petróleo de Vehículo"
            value={price}
            InputProps={{ style: { color: "black", fontWeight: "bold" } }}
            disabled={!isEditing}
            type="number"
            onChange={(event) => setPrice(Number(event.target.value))}
          />
          <TextField
            label="Fecha de Cancelación"
            value={canceledDate}
            InputProps={{ style: { color: "black", fontWeight: "bold" } }}
            slotProps={{ inputLabel: { shrink: true } }}
            disabled={!isEditing}
            type="date"
            onChange={(event) => setCanceledDate(event.target.value)}
            sx={{ gridColumn: { md: "1 / -1" } }}
          />
        </Stack>
      </Card>
      {isEditing ? (
        <Button sx={{ mt: 2, borderRadius: 99, minWidth: 140 }} variant="contained" onClick={() => void handleSave()}>
          Guardar
        </Button>
      ) : (
        <Button sx={{ mt: 2, borderRadius: 99, minWidth: 140 }} variant="contained" onClick={() => setIsEditing(true)}>
          Editar
        </Button>
      )}
    </Card>
  );
};
