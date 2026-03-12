import { Router } from "express";
import { ChargerOperationRoutes } from "./charger_operation/charger_operation.routes";
import { OtherCostChargerOperationRoutes } from "./other_cost_charger_operation/other_cost_charger_operation.routes";
import { VehicleRoutes } from "../presentation/vehicle/vehicle.routes";

export class OperationRoutes {
  private router = Router();
  private chargerOperationRoutes = new ChargerOperationRoutes();
  private otherCostChargerOperationRoutes =
    new OtherCostChargerOperationRoutes();
  private vehicleRoutes = new VehicleRoutes();

  constructor() {
    this.router.use(
      "/charger-operation",
      this.chargerOperationRoutes.getRoutes()
    );
    this.router.use(
      "/other-cost-charger-operation",
      this.otherCostChargerOperationRoutes.getRoutes()
    );
    this.router.use("/vehicle", this.vehicleRoutes.getRoutes());
  }

  getRoutes() {
    return this.router;
  }
}
