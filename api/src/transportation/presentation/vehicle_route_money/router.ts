import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { vehicleRouteMoneyBodySchema } from "../transportation.schemas";

import { VehicleRouteMoneyController } from "./controller";

export class VehicleRouteMoneyRoutes {
  private router = Router();
  private controller = new VehicleRouteMoneyController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(vehicleRouteMoneyBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(vehicleRouteMoneyBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.get("/vehicle-route/:id", validateParams(idParamSchema), this.controller.getByVehicleRouteId);
  }

  getRoutes() {
    return this.router;
  }
}
