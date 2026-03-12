import { Router } from "express";
import { OtherCostTravelController } from "./other_cost_travel.controller";

export class OtherCostTravelRoutes {
  private router = Router();
  private controller = new OtherCostTravelController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.get("/:id", this.controller.getById);
    this.router.get("/travel/:id", this.controller.getByTravelId);
  }
  getRoutes() {
    return this.router;
  }
}
