import { Router } from "express";
import { LoanController } from "./loan.controller";

export class LoanRoutes {
  private router = Router();
  private controller = new LoanController();
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
