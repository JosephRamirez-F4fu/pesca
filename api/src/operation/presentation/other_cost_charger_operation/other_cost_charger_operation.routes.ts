import { Router } from "express";
import { OtherCostChargerOperationController } from "./other_cost_charger_operation.controller";

export class OtherCostChargerOperationRoutes {
  private router = Router();
  private controller: OtherCostChargerOperationController =
    new OtherCostChargerOperationController();
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
