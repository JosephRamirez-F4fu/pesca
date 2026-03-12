import { Router } from "express";
import { VehicleRoutesController } from "./vehicle_routes.controller";

export class VehicleRoutes {
  private router = Router();
  private controller = new VehicleRoutesController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.get("/:id", this.controller.getById);
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.get("/vehicle-route/:id", this.controller.findByVehicleRoutes);
  }

  getRoutes() {
    return this.router;
  }
}
