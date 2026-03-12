import { Router } from "express";
import { LoanDetailController } from "./loan_detail.controller";

export class LoanDetailRoutes {
  private router = Router();
  private controller = new LoanDetailController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.get("/:id", this.controller.getById);
  }
  getRoutes() {
    return this.router;
  }
}
