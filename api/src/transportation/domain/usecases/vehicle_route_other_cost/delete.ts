import { VehicleRouteOtherCostRepository } from "./../../repositories/vehicle_route_other_cost.repository";

export class DeleteVehicleRouteOtherCostUseCase {
  private vehicleRouteOtherCostRepository =
    new VehicleRouteOtherCostRepository();
  async execute(id: number) {
    const vehicleRouteOtherCost =
      await this.vehicleRouteOtherCostRepository.delete(id);
    return vehicleRouteOtherCost;
  }
}
