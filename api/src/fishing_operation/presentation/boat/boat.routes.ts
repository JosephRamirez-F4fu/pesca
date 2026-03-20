import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { boatBodySchema } from "../fishing_operation.schemas";
import { BoatController } from "./boat.controller";
export class BoatRoutes {
  private router: Router = Router();
  private controller = new BoatController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(boatBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(boatBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
  }
  getRoutes() {
    return this.router;
  }
}
