import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { travelBodySchema } from "../fishing_operation.schemas";
import { TravelController } from "./travel.controller";

export class TravelRoutes {
  private router = Router();
  private controller = new TravelController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(travelBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(travelBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.get("/resume/:id", validateParams(idParamSchema), this.controller.resume);
    this.router.get("/boat/:id", validateParams(idParamSchema), this.controller.getAllByBoatId);
  }

  getRoutes() {
    return this.router;
  }
}
