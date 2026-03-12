import { Router } from "express";
import { VehicleRouteController } from "./vehicle_route.controller";

export class VehicleRouteRoutes {
  private router = Router();
  private controller = new VehicleRouteController();
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
