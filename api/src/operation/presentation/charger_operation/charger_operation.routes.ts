import { Router } from "express";
import { ChargerOperationController } from "./charger_operation.controller";

export class ChargerOperationRoutes {
  private router = Router();
  private controller = new ChargerOperationController();
  constructor() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.get("/:id", this.controller.getById);
    this.router.get(
      "/travel/:id_travel",
      this.controller.getChargerOperationByTravelId
    );
  }

  getRoutes() {
    return this.router;
  }
}
