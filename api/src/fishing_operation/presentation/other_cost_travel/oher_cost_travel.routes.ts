import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { otherCostTravelBodySchema } from "../fishing_operation.schemas";
import { OtherCostTravelController } from "./other_cost_travel.controller";

export class OtherCostTravelRoutes {
  private router = Router();
  private controller = new OtherCostTravelController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(otherCostTravelBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(otherCostTravelBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.get("/travel/:id", validateParams(idParamSchema), this.controller.getByTravelId);
  }
  getRoutes() {
    return this.router;
  }
}
