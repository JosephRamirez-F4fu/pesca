import { Router } from "express";
import { BoxesController } from "../controller";

export class BoxesRoutes {
  private router = Router();
  private controller = new BoxesController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.get("/:id", this.controller.getById);
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.get("/control-place/:id", this.controller.getByControlPlace);
  }

  getRoutes() {
    return this.router;
  }
}
