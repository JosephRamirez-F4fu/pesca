import { BoxesReturnController } from "../controller";
import { Router } from "express";

export class BoxesReturnRoutes {
  private router = Router();
  private controller = new BoxesReturnController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.get("/:id", this.controller.getById);
    this.router.get("/boxes/:id", this.controller.getByBoxes);
    this.router.get("/control-boxes/:id", this.controller.getByControl);
  }

  getRoutes() {
    return this.router;
  }
}
