import { VehicleRouteOtherCostRepository } from "./../../repositories/vehicle_route_other_cost.repository";
import { CreateVehicleRouteOtherCostDto } from "./../../dtos/vehicle_route_other_cost/create.dto";

export class UpdateVehicleRouteOtherCostUseCase {
  private vehicleRouteOtherCostRepository =
    new VehicleRouteOtherCostRepository();
  async execute(id: number, data: CreateVehicleRouteOtherCostDto) {
    const vehicleRouteOtherCost =
      await this.vehicleRouteOtherCostRepository.update(id, data);
    return vehicleRouteOtherCost;
  }
}
