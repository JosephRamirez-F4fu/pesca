import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { vehicleRoutesOilUseBodySchema } from "../transportation.schemas";

import { VehicleRoutesOilUseController } from "./controller";

export class VehicleRoutesOilUseRoutes {
  private router = Router();
  private controller = new VehicleRoutesOilUseController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(vehicleRoutesOilUseBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(vehicleRoutesOilUseBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.get("/vehicle-route/:id", validateParams(idParamSchema), this.controller.getByVehicleRouteId);
  }

  getRoutes() {
    return this.router;
  }
}
