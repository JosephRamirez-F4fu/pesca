import { Router } from "express";
import { VehicleRouteOtherCostController } from "./vehicle_rout_other_cost.controller";

export class VehicleRouteOtherCostRoutes {
  private router = Router();
  private controller = new VehicleRouteOtherCostController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.get("/:id", this.controller.getById);
    this.router.get("/vehicle-route/:id", this.controller.getByVehicleRoute);
  }

  getRoutes() {
    return this.router;
  }
}
