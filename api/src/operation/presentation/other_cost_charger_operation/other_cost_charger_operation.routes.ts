import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import {
  otherCostChargerOperationBodySchema,
  otherCostChargerOperationUpdateBodySchema,
} from "../operation.schemas";
import { OtherCostChargerOperationController } from "./other_cost_charger_operation.controller";

export class OtherCostChargerOperationRoutes {
  private router = Router();
  private controller: OtherCostChargerOperationController =
    new OtherCostChargerOperationController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(otherCostChargerOperationBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(otherCostChargerOperationUpdateBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
  }
  getRoutes() {
    return this.router;
  }
}
