import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import {
  vehicleCreateBodySchema,
  vehicleUpdateBodySchema,
} from "../operation.schemas";
import { VehicleController } from "./vehicle.controller";

export class VehicleRoutes {
  private router = Router();
  private controller: VehicleController = new VehicleController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(vehicleCreateBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(vehicleUpdateBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
  }

  getRoutes() {
    return this.router;
  }
}
