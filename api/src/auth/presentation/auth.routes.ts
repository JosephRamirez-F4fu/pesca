import { Router } from "express";
import { UserController } from "./controller";
import { jwtMiddleware } from "../../shared/presentation/middlewares/jwt.midddleware";

export class AuthRoutes {
  public router: Router;
  public controller = new UserController();
  constructor() {
    this.router = Router();
    this.controller = new UserController();
  }

  setRoutes() {
    this.router.post("/login", this.controller.login);
    this.router.post("/register", this.controller.register);
    this.router.get("/session", jwtMiddleware, this.controller.session);
    this.router.post("/logout", this.controller.logout);

    return this.router;
  }
}
