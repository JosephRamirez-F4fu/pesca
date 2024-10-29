import { FlotaController } from "./../adapter";
import { Router } from "express";

export class FlotaRouter {
  private static router = Router();
  private static controller = new FlotaController();
  //
  static getRouter(): Router {
    this.router.get("/flota", this.controller.obtenerFlota);
    this.router.post("/flota", this.controller.crearFlota);
    this.router.put("/flota/:id", this.controller.editarFlota);
    this.router.delete("/flota/:id", this.controller.eliminarFlota);
    this.router.get("/flota/:id", this.controller.obtenerFlotaPorId);
    this.router.post("/flota/titular", this.controller.obtenerFlotasPorNombre);
    this.router.post("/flota/nombre", this.controller.obtenerFlotasPorTitular);
    return this.router;
  }
}
