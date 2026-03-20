import { Router } from "express";
import {
  validateBody,
  validateParams,
} from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import {
  saleDriverCreateBodySchema,
  saleDriverUpdateBodySchema,
} from "../sales.schemas";
import { SaleDriverController } from "./driver.controller";

export class SaleDriverRoutes {
  private router = Router();
  private controller = new SaleDriverController();

  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(saleDriverCreateBodySchema), this.controller.create);
    this.router.patch(
      "/:id",
      validateParams(idParamSchema),
      validateBody(saleDriverUpdateBodySchema),
      this.controller.update
    );
  }

  getRoutes() {
    return this.router;
  }
}
