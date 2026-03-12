import { Box } from "@mui/material";
import { LiquidationMoneyConcern } from "./liquidation-money-concern";
import { LiquidationDetail } from "./liquidation-detail";
import { LiquidationBalance } from "./liquidation-balance";
import { LiquidationOtherCost } from "./liquidation-other-cost";
import { LiquidationResult } from "./liquidation-result";

export const ControlTransportDetailLiquidationSection = () => {
  return (
    <Box>
      <LiquidationMoneyConcern />
      <LiquidationDetail />
      <LiquidationBalance />
      <LiquidationOtherCost />
      <LiquidationResult />
    </Box>
  );
};
