import { Router } from "express";

import { VehicleRoutesOilUseController } from "./controller";

export class VehicleRoutesOilUseRoutes {
  private router = Router();
  private controller = new VehicleRoutesOilUseController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.get("/:id", this.controller.getById);
    this.router.get("/vehicle-route/:id", this.controller.getByVehicleRouteId);
  }

  getRoutes() {
    return this.router;
  }
}
