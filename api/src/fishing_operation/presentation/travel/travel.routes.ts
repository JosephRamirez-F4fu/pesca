import { Router } from "express";
import { TravelController } from "./travel.controller";

export class TravelRoutes {
  private router = Router();
  private controller = new TravelController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.get("/:id", this.controller.getById);
    this.router.get("/resume/:id", this.controller.resume);
    this.router.get("/boat/:id", this.controller.getAllByBoatId);
  }

  getRoutes() {
    return this.router;
  }
}
