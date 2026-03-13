import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { clientBodySchema } from "../sales.schemas";
import { ClientController } from "./client.controller";

export class ClientRoutes {
  private router = Router();
  private controller = new ClientController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(clientBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(clientBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
  }

  getRoutes() {
    return this.router;
  }
}
