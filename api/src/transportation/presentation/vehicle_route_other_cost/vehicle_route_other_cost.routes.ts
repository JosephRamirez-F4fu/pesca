import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { vehicleRouteOtherCostBodySchema } from "../transportation.schemas";
import { VehicleRouteOtherCostController } from "./vehicle_rout_other_cost.controller";

export class VehicleRouteOtherCostRoutes {
  private router = Router();
  private controller = new VehicleRouteOtherCostController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(vehicleRouteOtherCostBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(vehicleRouteOtherCostBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.get("/vehicle-route/:id", validateParams(idParamSchema), this.controller.getByVehicleRoute);
  }

  getRoutes() {
    return this.router;
  }
}
