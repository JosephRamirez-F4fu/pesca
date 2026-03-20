import { VehicleRouteOtherCostRepository } from "./../../repositories/vehicle_route_other_cost.repository";

export class GetAllVehicleRouteOtherCostUseCase {
  private vehicleRouteOtherCostRepository =
    new VehicleRouteOtherCostRepository();
  async execute() {
    const vehicleRouteOtherCosts =
      await this.vehicleRouteOtherCostRepository.findAll();
    return vehicleRouteOtherCosts;
  }
}
