import { useEffect, useState } from "react";
import {
  alpha,
  Box,
  Button,
  Card,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTravel } from "../../../../context/travel/useContext";
import { useChargerOperation } from "../../../../context/charger-operation";
import { travelResDto } from "../../../../domain/dto/travel.dto";
import { formatToISODate, formatToInputDate, toCurrency } from "../utils";

export const ChargerOperationCard = () => {
  const { travelSelected, SetTravels, travels } = useTravel();
  const { chargerOperation, update, setChargerOperation } =
    useChargerOperation();
  const [isEditing, setIsEditing] = useState(false);
  const [helper, setHelper] = useState(0);
  const [canceledDate, setCanceledDate] = useState("");
  const [travelCost, setTravelCost] = useState(0);

  useEffect(() => {
    if (!chargerOperation) {
      return;
    }

    setHelper(chargerOperation.helper);
    setTravelCost(chargerOperation.travel_cost);
    setCanceledDate(formatToInputDate(chargerOperation.date_canceled) || "");
  }, [chargerOperation]);

  const handleSave = async () => {
    if (!chargerOperation) {
      return;
    }

    const nextChargerOperation = {
      ...chargerOperation,
      helper,
      travel_cost: travelCost,
      date_canceled: formatToISODate(canceledDate),
      id_travel: travelSelected?.id || 0,
    };

    await update(chargerOperation.id, nextChargerOperation);
    setChargerOperation(nextChargerOperation);

    const travelsUpdated: travelResDto[] = travels.map((travel) =>
      travel.id === travelSelected?.id
        ? { ...travel, chargerOperation: nextChargerOperation }
        : travel
    );

    SetTravels(travelsUpdated);
    setIsEditing(false);
  };

  if (!travelSelected || !chargerOperation) {
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
        Pagos de Estibadores
      </Typography>
      {chargerOperation.date_canceled && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
            bgcolor: "primary.light",
          }}
        >
          <Typography variant="h4" color="white" sx={{ fontWeight: "bold" }}>
            Cancelado
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
          gap: 2,
        }}
      >
        <Card sx={{ p: 2.5, borderRadius: 3, boxShadow: "none", bgcolor: alpha("#0f3d3e", 0.04) }}>
          <Stack spacing={1}>
            <Typography sx={{ fontWeight: "bold" }}>
              Toneladas: {chargerOperation.weight}
            </Typography>
            <Typography sx={{ fontWeight: "bold", mt: 1 }}>Pagos base</Typography>
            <Typography>Estibador: {toCurrency(chargerOperation.footboard)}</Typography>
            <Typography>Bodeguero: {toCurrency(chargerOperation.charger)}</Typography>
            <Typography>Cajero: {toCurrency(chargerOperation.grocer)}</Typography>
          </Stack>
        </Card>
        <Card sx={{ p: 2.5, borderRadius: 3, boxShadow: "none", bgcolor: alpha("#0f3d3e", 0.04) }}>
          <Stack spacing={1.5}>
            <TextField
              label="Ayudante"
              value={helper}
              InputProps={{
                style: { color: "black", fontWeight: "bold" },
                startAdornment: <InputAdornment position="start">S/</InputAdornment>,
              }}
              disabled={!isEditing}
              type="number"
              onChange={(event) => setHelper(Number(event.target.value))}
            />
            <TextField
              label="Pasaje"
              value={travelCost}
              InputProps={{
                style: { color: "black", fontWeight: "bold" },
                startAdornment: <InputAdornment position="start">S/</InputAdornment>,
              }}
              disabled={!isEditing}
              type="number"
              onChange={(event) => setTravelCost(Number(event.target.value))}
            />
            <TextField
              label="Fecha de Cancelación"
              value={canceledDate}
              InputProps={{ style: { color: "black", fontWeight: "bold" } }}
              slotProps={{ inputLabel: { shrink: true } }}
              disabled={!isEditing}
              type="date"
              onChange={(event) => setCanceledDate(event.target.value)}
            />
            <Typography sx={{ fontWeight: 700 }}>
              Total:{" "}
              {toCurrency(
                chargerOperation.footboard +
                  chargerOperation.charger +
                  chargerOperation.grocer +
                  helper +
                  travelCost
              )}
            </Typography>
          </Stack>
        </Card>
      </Box>
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
