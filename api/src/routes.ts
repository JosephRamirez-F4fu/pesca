import { Router } from "express";
import { AuthRoutes } from "./auth/presentation/auth.routes";
import { jwtMiddleware } from "./shared/presentation/middlewares/jwt.midddleware";
import { TransportationRoutes } from "./transportation/presentation/transportation.routes";
import { OperationRoutes } from "./operation/presentation/operation.routes";
import { FishingOperationRoutes } from "./fishing_operation/presentation/fishing.routes";
export class Routes {
  private routerPublic: Router;
  private routerPrivate: Router;
  public AuthRoutes = new AuthRoutes();
  private FishingRoutes = new FishingOperationRoutes();
  private TransportationRoutes = new TransportationRoutes();
  private OperationRoutes = new OperationRoutes();
  constructor() {
    this.routerPrivate = Router();
    this.routerPublic = Router();
  }
  setPublicRoutes() {
    this.routerPublic.use("/auth", this.AuthRoutes.setRoutes());
    return this.routerPublic;
  }
  setPrivateRoutes() {
    this.routerPrivate.use(jwtMiddleware);
    this.routerPrivate.use("/fishing", this.FishingRoutes.getRoutes());
    this.routerPrivate.use(
      "/transportation",
      this.TransportationRoutes.getRoutes()
    );
    this.routerPrivate.use("/operation", this.OperationRoutes.getRoutes());
    return this.routerPrivate;
  }
}
