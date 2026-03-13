import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { boxesBodySchema } from "../../presentation/boxes.schemas";
import { BoxesController } from "../controller";

export class BoxesRoutes {
  private router = Router();
  private controller = new BoxesController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.post("/", validateBody(boxesBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(boxesBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/control-place/:id", validateParams(idParamSchema), this.controller.getByControlPlace);
  }

  getRoutes() {
    return this.router;
  }
}
