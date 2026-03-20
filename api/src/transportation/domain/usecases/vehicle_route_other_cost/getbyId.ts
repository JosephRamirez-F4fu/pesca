import { VehicleRouteOtherCostRepository } from "./../../repositories/vehicle_route_other_cost.repository";

export class FindByIdVehicleRouteOtherCostUseCase {
  private vehicleRouteOtherCostRepository =
    new VehicleRouteOtherCostRepository();
  async execute(id: number) {
    const vehicleRouteOtherCost =
      await this.vehicleRouteOtherCostRepository.findById(id);
    return vehicleRouteOtherCost;
  }
}
