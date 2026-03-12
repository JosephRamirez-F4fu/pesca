import { Router } from "express";
import { ClientController } from "./client.controller";

export class ClientRoutes {
  private router = Router();
  private controller = new ClientController();
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
