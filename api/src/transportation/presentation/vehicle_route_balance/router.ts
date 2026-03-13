import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { vehicleRouteBalanceBodySchema } from "../transportation.schemas";
import { VehicleRouteBalanceController } from "./controller";

export class VehicleRouteBalanceRoutes {
  private router = Router();
  private controller = new VehicleRouteBalanceController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(vehicleRouteBalanceBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(vehicleRouteBalanceBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.get("/vehicle-route/:id", validateParams(idParamSchema), this.controller.getByVehicleRouteId);
  }

  getRoutes() {
    return this.router;
  }
}
