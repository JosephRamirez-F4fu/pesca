import { Box, Stack, Typography } from "@mui/material";
import { LiquidationMoneyConcern } from "./liquidation-money-concern";
import { LiquidationDetail } from "./liquidation-detail";
import { LiquidationBalance } from "./liquidation-balance";
import { LiquidationOtherCost } from "./liquidation-other-cost";
import { LiquidationResult } from "./liquidation-result";

export const ControlTransportDetailLiquidationSection = () => {
  return (
    <Box sx={{ display: "grid", gap: 2.5 }}>
      <Stack spacing={0.8} sx={{ px: { xs: 0.5, md: 1 } }}>
        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#0f7c78",
          }}
        >
          Liquidacion operativa
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: "#16324f", fontWeight: 800, maxWidth: 720 }}
        >
          Control de gastos con lectura rapida y menos ruido visual
        </Typography>
      </Stack>
      <LiquidationMoneyConcern />
      <LiquidationDetail />
      <LiquidationBalance />
      <LiquidationOtherCost />
      <LiquidationResult />
    </Box>
  );
};
