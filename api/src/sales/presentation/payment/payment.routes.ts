import { Router } from "express";
import { PaymentController } from "./payment.controller";
export class PaymentRoutes {
  private router = Router();
  private controller = new PaymentController();
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
