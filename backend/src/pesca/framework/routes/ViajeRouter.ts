import { Router } from "express";
import { ViajeController } from "@/pesca/adapter/controllers";
export class ViajeRouter {
  private static router = Router();
  private static controller = new ViajeController();
  static getRouter(): Router {
    this.router.get("/", this.controller.getViajes);
    this.router.get("/summary", this.controller.getViajesSummary);
    this.router.post("/", this.controller.createViaje);
    this.router.put("/:id", this.controller.updateViaje);
    this.router.delete("/:id", this.controller.deleteViaje);
    this.router.get("/:id", this.controller.getViajeById);
    this.router.get("/flota/:id", this.controller.getViajesByFlotaId);

    return this.router;
  }
}
