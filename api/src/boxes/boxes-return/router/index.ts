import { BoxesReturnController } from "../controller";
import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { boxesReturnBodySchema } from "../../presentation/boxes.schemas";

export class BoxesReturnRoutes {
  private router = Router();
  private controller = new BoxesReturnController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(boxesReturnBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(boxesReturnBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.get("/boxes/:id", validateParams(idParamSchema), this.controller.getByBoxes);
    this.router.get("/control-boxes/:id", validateParams(idParamSchema), this.controller.getByControl);
  }

  getRoutes() {
    return this.router;
  }
}
