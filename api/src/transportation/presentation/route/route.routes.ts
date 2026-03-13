import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { routeBodySchema } from "../transportation.schemas";
import { RouteController } from "./route.controller";

export class RouteRoutes {
  private router = Router();
  private controller = new RouteController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(routeBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(routeBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
  }

  getRoutes() {
    return this.router;
  }
}
