import { Router } from "express";
import { validateBody, validateParams } from "../../../shared/presentation/middlewares/request-validation.middleware";
import { idParamSchema } from "../../../shared/presentation/schemas/common.schemas";
import { loanBodySchema } from "../sales.schemas";
import { LoanController } from "./loan.controller";

export class LoanRoutes {
  private router = Router();
  private controller = new LoanController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", validateBody(loanBodySchema), this.controller.create);
    this.router.put("/:id", validateParams(idParamSchema), validateBody(loanBodySchema), this.controller.update);
    this.router.delete("/:id", validateParams(idParamSchema), this.controller.delete);
    this.router.get("/:id", validateParams(idParamSchema), this.controller.getById);
  }

  getRoutes() {
    return this.router;
  }
}
