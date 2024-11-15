import { Router } from "express";

import {
  PescaRouter,
  GastosViajeRouter,
  ViajeRouter,
  FlotaRouter,
} from "@/pesca/framework/routes";

export class MainRouter {
  private static router = Router();
  static getRouter(): Router {
    this.router.use("/pesca", PescaRouter.getRouter());
    this.router.use("/gastosviaje", GastosViajeRouter.getRouter());
    this.router.use("/viaje", ViajeRouter.getRouter());
    this.router.use("/flota", FlotaRouter.getRouter());
    return this.router;
  }
}
