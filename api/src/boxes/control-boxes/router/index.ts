import { Router } from "express";

import { ControlBoxesController } from "../controller";

export class ControlBoxesRoutes {
  private router = Router();
  private controller = new ControlBoxesController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.get("/:id", this.controller.getById);
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
  }

  getRoutes() {
    return this.router;
  }
}
