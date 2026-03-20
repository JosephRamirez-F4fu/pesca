import { Router } from "express";
import {
  validateBody,
  validateParams,
} from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import {
  productCreateBodySchema,
  productUpdateBodySchema,
} from "../sales.schemas";
import { ProductController } from "./product.controller";

export class ProductRoutes {
  private router = Router();
  private controller = new ProductController();

  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(productCreateBodySchema), this.controller.create);
    this.router.patch(
      "/:id",
      validateParams(idParamSchema),
      validateBody(productUpdateBodySchema),
      this.controller.update
    );
  }

  getRoutes() {
    return this.router;
  }
}
