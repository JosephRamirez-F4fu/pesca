import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTravel } from "../../../../context/travel/useContext";
import { useChargerOperation } from "../../../../context/charger-operation";
import { useFishing } from "../../../../context/fishing/useContext";
import { useOtherCost } from "../../../../context/other-cost/useContext";
import { toCurrency } from "../utils";

export const TravelResumeCard = () => {
  const { travelSelected } = useTravel();
  const { chargerOperation } = useChargerOperation();
  const { fishings } = useFishing();
  const { otherCostTravels } = useOtherCost();

  if (!travelSelected) {
    return (
      <Typography variant="h6">No hay datos de viaje seleccionados.</Typography>
    );
  }

  const totalFishing = fishings.reduce(
    (acc, fishing) => acc + fishing.weight * fishing.boxes * fishing.price,
    0
  );
  const totalCost =
    (travelSelected.gas_cylinder_cost || 0) +
    (travelSelected.oil_consume_price || 0) +
    (travelSelected.provisions_cost || 0);
  const totalBoxes = fishings.reduce((acc, fishing) => acc + fishing.boxes, 0);
  const totalTons =
    fishings.reduce((acc, fishing) => acc + fishing.weight * fishing.boxes, 0) /
    1000;
  const totalOtherCost = otherCostTravels.reduce(
    (acc, otherCost) => (!otherCost.is_added ? acc + otherCost.price : acc),
    0
  );
  const totalOtherCostAdded = otherCostTravels.reduce(
    (acc, otherCost) => (otherCost.is_added ? acc + otherCost.price : acc),
    0
  );
  const vehicleCost = travelSelected.oil_vehicle_price;
  const costCharge =
    (chargerOperation?.travel_cost || 0) +
    (chargerOperation?.helper || 0) +
    (chargerOperation?.footboard || 0) +
    (chargerOperation?.charger || 0) +
    (chargerOperation?.grocer || 0);
  const totalLiquid = totalFishing - totalCost - totalOtherCostAdded;
  const repartition = totalLiquid / 2;

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
        Resumen del viaje
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Concepto</TableCell>
            <TableCell>Monto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Efectivo de Pesca</TableCell>
            <TableCell>{toCurrency(totalFishing)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gasto de viaje</TableCell>
            <TableCell>{toCurrency(totalCost)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Otros Gastos Agregados a la Division</TableCell>
            <TableCell>{toCurrency(totalOtherCostAdded)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Otros Gastos</TableCell>
            <TableCell>{toCurrency(totalOtherCost)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Petroleo de Vehiculo</TableCell>
            <TableCell>{toCurrency(vehicleCost)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pago Estibadores</TableCell>
            <TableCell>{toCurrency(costCharge)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Liquido</TableCell>
            <TableCell>{toCurrency(totalLiquid)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Repartición</TableCell>
            <TableCell>{toCurrency(repartition)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Numero Cajas</TableCell>
            <TableCell>{totalBoxes}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Toneladas</TableCell>
            <TableCell>{totalTons}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};
