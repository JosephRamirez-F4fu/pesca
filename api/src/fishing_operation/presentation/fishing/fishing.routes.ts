import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { fishingBodySchema } from "../fishing_operation.schemas";
import { FishingController } from "./fishing.controller";
export class FishingRoutes {
  private router: Router = Router();
  private controller = new FishingController();
  constructor() {
    this.router.post("/", validateBody(fishingBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(fishingBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.get("/travel/:id", validateParams(idParamSchema), this.controller.getByTravelId);
  }
  getRoutes() {
    return this.router;
  }
}
