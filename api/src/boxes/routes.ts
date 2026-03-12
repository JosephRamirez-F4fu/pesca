import { Router } from "express";

import { BoxesRoutes } from "./boxes/router";
import { BoxesReturnRoutes } from "./boxes-return/router";
import { ControlBoxesRoutes } from "./control-boxes/router";
import { ControlPlaceRouter } from "./control-place/router";
export class BoxesModule {
  private router = Router();
  private boxesRoutes = new BoxesRoutes();
  private boxesReturnRoutes = new BoxesReturnRoutes();
  private controlBoxesRoutes = new ControlBoxesRoutes();
  private controlPlaceRouter = new ControlPlaceRouter();
  constructor() {
    this.router.use("/boxes", this.boxesRoutes.getRoutes());
    this.router.use("/boxes-return", this.boxesReturnRoutes.getRoutes());
    this.router.use("/control-boxes", this.controlBoxesRoutes.getRoutes());
    this.router.use("/boxes-place", this.controlPlaceRouter.getRoutes());
  }

  getRoutes() {
    return this.router;
  }
}
