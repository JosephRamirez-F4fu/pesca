import { Router } from "express";
import {
  validateBody,
  validateParams,
} from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import {
  saleVehicleCreateBodySchema,
  saleVehicleUpdateBodySchema,
} from "../sales.schemas";
import { SaleVehicleController } from "./vehicle.controller";

export class SaleVehicleRoutes {
  private router = Router();
  private controller = new SaleVehicleController();

  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(saleVehicleCreateBodySchema), this.controller.create);
    this.router.patch(
      "/:id",
      validateParams(idParamSchema),
      validateBody(saleVehicleUpdateBodySchema),
      this.controller.update
    );
  }

  getRoutes() {
    return this.router;
  }
}
