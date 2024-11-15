import { Router } from "express";
import { PescaController } from "@/pesca/adapter/controllers";
export class PescaRouter {
  private static router = Router();
  private static pescaController = new PescaController();
  static getRouter(): Router {
    this.router.get("/", this.pescaController.getPesca);
    this.router.post("/", this.pescaController.createPesca);
    this.router.put("/:id", this.pescaController.updatePesca);
    this.router.delete("/:id", this.pescaController.deletePesca);
    this.router.get("/:id", this.pescaController.getPescaById);
    this.router.get("/viaje/:id", this.pescaController.getPescaByViajeId);
    this.router.get("/flota/:id", this.pescaController.getPescaByFlotaId);

    return this.router;
  }
}
