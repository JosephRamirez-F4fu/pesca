import { Router } from "express";
import { GastosViajeController } from "@/pesca/adapter/controllers";

export class GastosViajeRouter {
  private static router = Router();
  private static controller = new GastosViajeController();
  static getRouter(): Router {
    this.router.get("/gastosviaje", this.controller.obtenerGastosViaje);
    this.router.post("/gastosviaje", this.controller.crearGastosViaje);
    this.router.put("/gastosviaje/:id", this.controller.editarGastosViaje);
    this.router.delete("/gastosviaje/:id", this.controller.eliminarGastosViaje);
    this.router.get(
      "/gastosviaje/:id",
      this.controller.obtenerGastosViajePorId
    );
    this.router.post(
      "/gastosviaje/viaje",
      this.controller.obtenerGastosViajePorViaje
    );
    return this.router;
  }
}
