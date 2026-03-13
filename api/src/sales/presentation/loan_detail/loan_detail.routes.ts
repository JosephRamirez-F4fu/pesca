import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { loanDetailBodySchema } from "../sales.schemas";
import { LoanDetailController } from "./loan_detail.controller";

export class LoanDetailRoutes {
  private router = Router();
  private controller = new LoanDetailController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(loanDetailBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(loanDetailBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
  }
  getRoutes() {
    return this.router;
  }
}
