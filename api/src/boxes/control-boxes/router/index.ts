import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import {
  controlBoxesBodySchema,
  controlBoxesCreateBodySchema,
} from "../../presentation/boxes.schemas";

import { ControlBoxesController } from "../controller";

export class ControlBoxesRoutes {
  private router = Router();
  private controller = new ControlBoxesController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.post("/", validateBody(controlBoxesCreateBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(controlBoxesBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
  }

  getRoutes() {
    return this.router;
  }
}
