import { Router } from "express";
import { z } from "zod";
import {
  validateBody,
  validateParams,
} from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import {
  saleBalanceCreateBodySchema,
  saleBalanceDetailCreateBodySchema,
  saleBalanceDetailUpdateBodySchema,
  saleBalanceUpdateBodySchema,
} from "../sales.schemas";
import { SaleBalanceController } from "./balance.controller";

const balanceDetailParamSchema = z.object({
  id: z.coerce.number().int().positive(),
  detailId: z.coerce.number().int().positive(),
});

export class SaleBalanceRoutes {
  private router = Router();
  private controller = new SaleBalanceController();

  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(saleBalanceCreateBodySchema), this.controller.create);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
    this.router.patch(
      "/:id",
      validateParams(idParamSchema),
      validateBody(saleBalanceUpdateBodySchema),
      this.controller.update
    );
    this.router.delete(
      "/:id",
      validateParams(idParamSchema),
      this.controller.delete
    );
    this.router.post(
      "/:id/details",
      validateParams(idParamSchema),
      validateBody(saleBalanceDetailCreateBodySchema),
      this.controller.createDetail
    );
    this.router.patch(
      "/:id/details/:detailId",
      validateParams(balanceDetailParamSchema),
      validateBody(saleBalanceDetailUpdateBodySchema),
      this.controller.updateDetail
    );
    this.router.delete(
      "/:id/details/:detailId",
      validateParams(balanceDetailParamSchema),
      this.controller.deleteDetail
    );
  }

  getRoutes() {
    return this.router;
  }
}
