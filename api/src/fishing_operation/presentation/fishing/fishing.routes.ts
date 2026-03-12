import { Router } from "express";
import { FishingController } from "./fishing.controller";
export class FishingRoutes {
  private router: Router = Router();
  private controller = new FishingController();
  constructor() {
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.get("/:id", this.controller.getById);
    this.router.get("/travel/:id", this.controller.getByTravelId);
  }
  getRoutes() {
    return this.router;
  }
}
