import { Router } from "express";
import { ControlPlaceController } from "../controller";

export class ControlPlaceRouter {
  private controller = new ControlPlaceController();
  public router = Router();

  constructor() {
    this.router.post("/", this.controller.create);
    this.router.get("/", this.controller.findAll);
    this.router.get("/:id", this.controller.findById);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.get("/control-boxes/:id", this.controller.findControlBoxesById);
  }

  public getRoutes() {
    return this.router;
  }
}
