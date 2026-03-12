import { useState, useEffect } from "react";
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
  InputAdornment,
  Stack,
} from "@mui/material";
import OilBarrelRoundedIcon from "@mui/icons-material/OilBarrelRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { useTankPrice } from "../../context/tank-price/useContext";
import { toCurrency } from "../../../shared/utils/currency";

export interface TankPriceControlProps {
  compact?: boolean;
}

export const TankPriceControl = ({ compact = false }: TankPriceControlProps) => {
  const { price, setPrice } = useTankPrice();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>(price);

  useEffect(() => {
    setValue(price);
  }, [price]);

  const handleSave = () => {
    const n = Number(value);
    if (!isNaN(n) && n > 0) {
      setPrice(n);
      setOpen(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          minHeight: compact ? "auto" : { xl: 0 },
          borderRadius: compact ? 3 : 4,
          border: "1px solid",
          borderColor: alpha("#0f3d3e", 0.12),
          boxShadow: compact
            ? "0 12px 28px rgba(10, 33, 34, 0.08)"
            : "0 18px 46px rgba(10, 33, 34, 0.08)",
          background:
            "linear-gradient(160deg, rgba(17,71,72,0.96) 0%, rgba(27,92,92,0.94) 58%, rgba(54,121,116,0.9) 100%)",
          color: "#f7f1e6",
        }}
      >
        <CardContent sx={{ p: compact ? { xs: 1.5, md: 1.75 } : { xs: 2.25, md: 2.5 } }}>
          <Stack
            direction={
              compact
                ? { xs: "row" }
                : { xs: "column", sm: "row", xl: "column" }
            }
            spacing={compact ? 1.5 : { xs: 2, sm: 2.5, xl: 2 }}
            justifyContent="space-between"
            alignItems={compact ? "center" : undefined}
            sx={{ height: "100%" }}
          >
            <Stack
              direction={
                compact
                  ? "row"
                  : { xs: "column", md: "row", xl: "column" }
              }
              spacing={
                compact ? 1 : { xs: 1.5, md: 2.25, xl: 1.5 }
              }
              alignItems={
                compact
                  ? "center"
                  : { xs: "flex-start", md: "center", xl: "flex-start" }
              }
              sx={{ flex: 1, minWidth: 0, justifyContent: compact ? "space-between" : undefined }}
            >
              {!compact && (
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: alpha("#f7f1e6", 0.14),
                    flexShrink: 0,
                  }}
                >
                  <OilBarrelRoundedIcon fontSize="small" />
                </Box>
              )}
              <Stack spacing={compact ? 0.1 : 0.75} sx={{ minWidth: 0 }}>
                <Typography
                  variant="overline"
                  sx={{
                    letterSpacing: compact ? "0.18em" : "0.22em",
                    opacity: 0.78,
                    fontSize: compact ? "0.62rem" : "0.68rem",
                  }}
                >
                  Combustible
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: compact
                      ? { xs: "0.88rem", md: "0.94rem" }
                      : { xs: "1.2rem", md: "1.35rem" },
                  }}
                >
                  {compact ? "Precio" : "Precio del tanque"}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    fontSize: compact
                      ? { xs: "1.55rem", md: "1.65rem" }
                      : { xs: "1.9rem", md: "2.05rem", xl: "1.95rem" },
                    lineHeight: 1,
                  }}
                >
                  {toCurrency(price)}
                </Typography>
                {!compact && (
                  <Typography
                    sx={{
                      color: alpha("#f7f1e6", 0.78),
                      fontSize: { xs: "0.9rem", md: "0.92rem" },
                      maxWidth: { xs: 280, md: 320, xl: 260 },
                    }}
                  >
                    Este valor se usa como referencia operativa para el cálculo base
                    del consumo y la carga de petróleo.
                  </Typography>
                )}
              </Stack>
            </Stack>

            <Stack
              direction={
                compact
                  ? "row"
                  : { xs: "row", sm: "column", md: "row", xl: "column" }
              }
              justifyContent={
                compact
                  ? "flex-end"
                  : { xs: "flex-start", sm: "center", md: "flex-end", xl: "flex-start" }
              }
              alignItems={
                compact
                  ? "center"
                  : { xs: "center", sm: "stretch", md: "center", xl: "flex-start" }
              }
              sx={{ flexShrink: 0 }}
            >
              <Button
                variant="contained"
                startIcon={<TuneRoundedIcon />}
                onClick={() => setOpen(true)}
                sx={{
                  alignSelf: compact ? "center" : { xs: "flex-start", sm: "stretch", md: "flex-start" },
                  borderRadius: 99,
                  minHeight: compact ? 34 : 38,
                  px: compact ? 1.35 : 2,
                  fontSize: compact ? "0.82rem" : "0.88rem",
                  whiteSpace: "nowrap",
                  bgcolor: "#ecd5a6",
                  color: "#153e3f",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#e4c88d", boxShadow: "none" },
                }}
              >
                Ajustar precio
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            p: 3,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,241,230,0.96) 100%)",
            borderRadius: 3,
            boxShadow: "0 28px 80px rgba(10, 33, 34, 0.18)",
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.35rem", md: "1.5rem" } }}>
            Cambiar precio del tanque
          </Typography>
          <Typography color="text.secondary">
            Ajusta el valor de referencia para futuros registros de combustible.
          </Typography>
          <TextField
            label="Precio por unidad"
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            inputProps={{ step: 0.01, min: 0 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">S/</InputAdornment>
              ),
            }}
            helperText={`Vista previa: ${toCurrency(Number(value) || 0)}`}
            autoFocus
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button color="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
