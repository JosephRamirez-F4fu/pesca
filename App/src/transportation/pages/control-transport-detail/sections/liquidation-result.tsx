import { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import { useRouteDetail } from "../../../context/vehicle_route_detail";
import { useRouteBalance } from "../../../context/vehicle_route_balance";
import { useRoutesOtherCost } from "../../../context/other-cost";
import { useVehicleRouteMoney } from "../../../context/vehicle_route_money";
import { useVehicleRoute } from "../../../context/vehicle-route";
import { toCurrency } from "../utils";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "primary.main",
      }}
    >
      <Box
        sx={{
          padding: 2,
          marginTop: 2,
          display: "flex",
          justifyContent: "center",
          minWidth: "80%",
          maxWidth: "100%",
        }}
      >
        <Card sx={{ padding: 3, boxShadow: 3, borderRadius: 2, width: "50%" }}>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, textAlign: "center" }}
          >
            LIQUIDACION DE GASTOS
          </Typography>
          <Row label="Gastos Balanza:" value={toCurrency(totalBalance)} />
          <Row label="Otros Gastos:" value={toCurrency(totalCost)} />
          <Row label="Gastos Peajes:" value={toCurrency(totalTaxes)} />
          <Row label="Dinero Dado:" value={toCurrency(totalMoney)} />
          <Box sx={{ borderBottom: "1px solid", borderColor: "divider", my: 2 }} />
          {isChangeGiven ? (
            <Typography variant="body1">Vuelto Entregado</Typography>
          ) : (
            <Row
              label="Saldo:"
              value={
                result >= 0
                  ? `A devolver: ${toCurrency(result)}`
                  : `A pagar: ${toCurrency(result)}`
              }
              valueColor={result >= 0 ? "green" : "red"}
            />
          )}
        </Card>
      </Box>
    </Box>
  );
};

const Row = ({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
    <Typography variant="body1">{label}</Typography>
    <Typography variant="body1" sx={valueColor ? { color: valueColor } : {}}>
      {value}
    </Typography>
  </Box>
);
