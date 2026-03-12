import { useEffect, useState } from "react";
import { alpha, Box, Stack, Typography } from "@mui/material";
import { useRouteDetail } from "../../../context/vehicle_route_detail";
import { useRouteBalance } from "../../../context/vehicle_route_balance";
import { useRoutesOtherCost } from "../../../context/other-cost";
import { useVehicleRouteMoney } from "../../../context/vehicle_route_money";
import { useVehicleRoute } from "../../../context/vehicle-route";
import { toCurrency } from "../utils";
import { SectionSurface, SummaryPill } from "./detail-surface";

export const LiquidationResult = () => {
  const { routeSelected } = useVehicleRoute();
  const { routeDetail } = useRouteDetail();
  const { vehicleRouteBalance } = useRouteBalance();
  const { costs } = useRoutesOtherCost();
  const { routesMoney } = useVehicleRouteMoney();
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [totalTaxes, setTotalTaxes] = useState(0);
  const [result, setResult] = useState(0);
  const isChangeGiven = routeDetail?.changeGiven ?? false;

  useEffect(() => {
    if (!routeSelected || !routeDetail) return;

    const balanceSum = vehicleRouteBalance.reduce(
      (acc, balance) => acc + balance.balance,
      0
    );
    const costSum = costs.reduce((acc, cost) => acc + cost.price, 0);
    const moneySum = routesMoney.reduce((acc, money) => acc + money.money, 0);
    const taxes = routeDetail.taxes_in + routeDetail.taxes_out;

    setTotalBalance(balanceSum);
    setTotalCost(costSum);
    setTotalMoney(moneySum);
    setTotalTaxes(taxes);
    setResult(moneySum - costSum - taxes - balanceSum);
  }, [routeDetail, vehicleRouteBalance, costs, routesMoney, routeSelected]);

  return (
    <SectionSurface
      eyebrow="Cierre"
      title="Liquidacion de gastos"
      subtitle="Resume entradas, salidas y saldo final en una sola lectura sin depender del formulario."
      action={
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
          <SummaryPill label="Peajes" value={toCurrency(totalTaxes)} />
          <SummaryPill label="Dinero dado" value={toCurrency(totalMoney)} />
        </Stack>
      }
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={2}
        sx={{ mt: 2.25 }}
      >
        <Box
          sx={{
            flex: 1.2,
            p: 2.2,
            borderRadius: 3,
            backgroundColor: alpha("#0f7c78", 0.08),
          }}
        >
          <Stack spacing={1.35}>
            <Row label="Gastos balanza" value={toCurrency(totalBalance)} />
            <Row label="Otros gastos" value={toCurrency(totalCost)} />
            <Row label="Gastos peajes" value={toCurrency(totalTaxes)} />
            <Row label="Dinero dado" value={toCurrency(totalMoney)} />
          </Stack>
        </Box>
        <Box
          sx={{
            flex: 0.9,
            p: 2.4,
            borderRadius: 3,
            background:
              result >= 0
                ? "linear-gradient(180deg, rgba(15, 124, 120, 0.12) 0%, rgba(255,255,255,0.94) 100%)"
                : "linear-gradient(180deg, rgba(201, 130, 90, 0.16) 0%, rgba(255,255,255,0.94) 100%)",
            border: "1px solid",
            borderColor:
              result >= 0 ? alpha("#0f7c78", 0.12) : alpha("#c9825a", 0.16),
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#567170",
            }}
          >
            Estado final
          </Typography>
          {isChangeGiven ? (
            <Typography
              variant="h5"
              sx={{ mt: 1.4, color: "#16324f", fontWeight: 800 }}
            >
              Vuelto entregado
            </Typography>
          ) : (
            <>
              <Typography
                variant="h3"
                sx={{
                  mt: 1.2,
                  color: result >= 0 ? "#0f7c78" : "#8f4c34",
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                {toCurrency(Math.abs(result))}
              </Typography>
              <Typography sx={{ mt: 1, color: "#4f6a7a" }}>
                {result >= 0 ? "Monto a devolver" : "Monto a pagar"}
              </Typography>
            </>
          )}
        </Box>
      </Stack>
    </SectionSurface>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
    <Typography sx={{ color: "#4f6a7a" }}>{label}</Typography>
    <Typography sx={{ color: "#16324f", fontWeight: 700 }}>{value}</Typography>
  </Box>
);
