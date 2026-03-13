import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { controlPlaceBodySchema } from "../../presentation/boxes.schemas";
import { ControlPlaceController } from "../controller";

export class ControlPlaceRouter {
  private controller = new ControlPlaceController();
  public router = Router();

  constructor() {
    this.router.post("/", validateBody(controlPlaceBodySchema), this.controller.create);
    this.router.get("/", this.controller.findAll);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.findById);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(controlPlaceBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/control-boxes/:id", validateParams(idParamSchema), this.controller.findControlBoxesById);
  }

  public getRoutes() {
    return this.router;
  }
}
