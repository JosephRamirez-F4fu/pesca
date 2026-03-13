import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema, idTravelParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { chargerOperationBodySchema } from "../operation.schemas";
import { ChargerOperationController } from "./charger_operation.controller";

export class ChargerOperationRoutes {
  private router = Router();
  private controller = new ChargerOperationController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(chargerOperationBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(chargerOperationBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.get(
      "/travel/:id_travel",
      validateParams(idTravelParamSchema),
      this.controller.getChargerOperationByTravelId
    );
  }

  getRoutes() {
    return this.router;
  }
}
