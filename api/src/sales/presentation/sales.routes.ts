import { Router } from "express";
import { SaleDriverRoutes } from "./driver/driver.routes";
import { SaleVehicleRoutes } from "./vehicle/vehicle.routes";
import { ProductRoutes } from "./product/product.routes";
import { SaleBalanceRoutes } from "./balance/balance.routes";

export class SalesRoutes {
  private router = Router();
  private saleDriverRoutes = new SaleDriverRoutes();
  private saleVehicleRoutes = new SaleVehicleRoutes();
  private productRoutes = new ProductRoutes();
  private saleBalanceRoutes = new SaleBalanceRoutes();

  constructor() {
    this.router.use("/drivers", this.saleDriverRoutes.getRoutes());
    this.router.use("/vehicles", this.saleVehicleRoutes.getRoutes());
    this.router.use("/products", this.productRoutes.getRoutes());
    this.router.use("/balances", this.saleBalanceRoutes.getRoutes());
  }

  getRoutes() {
    return this.router;
  }
}
