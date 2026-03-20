import { Router } from "express";
import { RouteRoutes } from "./route/route.routes";
import { VehicleRouteRoutes } from "./vehicle_route/vehicle_route.routes";
import { VehicleRouteOtherCostRoutes } from "./vehicle_route_other_cost/vehicle_route_other_cost.routes";
import { VehicleRoutes } from "./vehicle_routes/vehicle_routes.routes";
import { VehicleRouteMoneyRoutes } from "./vehicle_route_money/router";
import { VehicleRoutesOilUseRoutes } from "./vehicle_routes_oil_use/router";

import { VehicleRouteDetailRoutes } from "./vehicle_route_detail/router";
import { VehicleRouteBalanceRoutes } from "./vehicle_route_balance/router";

export class TransportationRoutes {
  private router = Router();
  private routeRoutes = new RouteRoutes();
  private vehicleRouteRoutes = new VehicleRouteRoutes();
  private vehicleRouteOtherCostRoutes = new VehicleRouteOtherCostRoutes();
  private vehicleRoutes = new VehicleRoutes();
  private vehicleRouteOilUseRoutes = new VehicleRoutesOilUseRoutes();
  private vehicleRouteDetailRoutes = new VehicleRouteDetailRoutes();
  private vehicleRouteBalanceRoutes = new VehicleRouteBalanceRoutes();
  private vehicleRouteMoneyRoutes = new VehicleRouteMoneyRoutes();
  constructor() {
    this.router.use("/routes", this.routeRoutes.getRoutes());
    this.router.use("/vehicle-route", this.vehicleRouteRoutes.getRoutes());
    this.router.use(
      "/vehicle-route-other-costs",
      this.vehicleRouteOtherCostRoutes.getRoutes()
    );
    this.router.use("/vehicle-routes", this.vehicleRoutes.getRoutes());

    this.router.use(
      "/vehicle-routes-oil-use",
      this.vehicleRouteOilUseRoutes.getRoutes()
    );

    this.router.use(
      "/vehicle-route-details",
      this.vehicleRouteDetailRoutes.getRoutes()
    );

    this.router.use(
      "/vehicle-route-balances",
      this.vehicleRouteBalanceRoutes.getRoutes()
    );

    this.router.use(
      "/vehicle-route-money",
      this.vehicleRouteMoneyRoutes.getRoutes()
    );
  }

  getRoutes() {
    return this.router;
  }
}
