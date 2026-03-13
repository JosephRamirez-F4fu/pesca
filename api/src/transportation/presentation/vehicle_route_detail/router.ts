import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { destinationParamSchema, idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { vehicleRouteDetailBodySchema } from "../transportation.schemas";

import { VehicleRouteDetailController } from "./controller";

export class VehicleRouteDetailRoutes {
  private router = Router();
  private controller = new VehicleRouteDetailController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(vehicleRouteDetailBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(vehicleRouteDetailBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.get("/vehicle-route/:id", validateParams(idParamSchema), this.controller.getByVehicleRouteId);
    this.router.get(
      "/vehicle-route-use/:destination",
      validateParams(destinationParamSchema),
      this.controller.getVehicleUseOilByDestination
    );
  }

  getRoutes() {
    return this.router;
  }
}
