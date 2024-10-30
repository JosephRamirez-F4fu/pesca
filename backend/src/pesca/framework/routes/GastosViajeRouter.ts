import { Router } from "express";
import { GastosViajeController } from "@/pesca/adapter/controllers";

export class GastosViajeRouter {
  private static router = Router();
  private static controller = new GastosViajeController();
  static getRouter(): Router {
    this.router.get("/", this.controller.getGastosViaje);
    this.router.post("/", this.controller.createGastosViaje);
    this.router.put("/:id", this.controller.updateGastosViaje);
    this.router.delete("/:id", this.controller.deleteGastosViaje);
    this.router.get("/:id", this.controller.getGastosViajeById);
    this.router.get("/viaje/:id", this.controller.getGastosViajeByViajeId);
    this.router.get("/concepto/:concepto", this.controller.getGastosViajeByConcepto);
    this.router.get("/flota/:id", this.controller.getGastosViajeByFlotaId);

    return this.router;
  }
}
