import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { vehicleRoutesBodySchema } from "../transportation.schemas";
import { VehicleRoutesController } from "./vehicle_routes.controller";

export class VehicleRoutes {
  private router = Router();
  private controller = new VehicleRoutesController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.post("/", validateBody(vehicleRoutesBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(vehicleRoutesBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/vehicle-route/:id", validateParams(idParamSchema), this.controller.findByVehicleRoutes);
  }

  getRoutes() {
    return this.router;
  }
}
