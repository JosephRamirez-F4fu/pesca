import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { paymentBodySchema } from "../sales.schemas";
import { PaymentController } from "./payment.controller";
export class PaymentRoutes {
  private router = Router();
  private controller = new PaymentController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(paymentBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(paymentBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
  }

  getRoutes() {
    return this.router;
  }
}
