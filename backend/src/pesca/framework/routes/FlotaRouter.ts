import { FlotaController } from "@/pesca/adapter/controllers";
import { Router } from "express";

export class FlotaRouter {
  private static router = Router();
  private static controller = new FlotaController();
  
  static getRouter(): Router {
    this.router.get("/", this.controller.obtenerFlota);
    this.router.post("/", this.controller.crearFlota);
    this.router.put("/:id", this.controller.editarFlota);
    this.router.delete("/:id", this.controller.eliminarFlota);
    this.router.get("/:id", this.controller.obtenerFlotaPorId);
    this.router.post("/titular", this.controller.obtenerFlotasPorNombre);
    this.router.post("/nombre", this.controller.obtenerFlotasPorTitular);
    return this.router;
  }
}
