import { VehicleRouteOtherCostRepository } from "./../../repositories/vehicle_route_other_cost.repository";
import { CreateVehicleRouteOtherCostDto } from "./../../dtos/vehicle_route_other_cost/create.dto";
import { VehicleRouteOtherCost } from "./../../entities/vehicle_route_other_cost";

export class CreateVehicleRouteOtherCostUseCase {
  private vehicleRouteOtherCostRepository =
    new VehicleRouteOtherCostRepository();
  async execute(
    data: CreateVehicleRouteOtherCostDto
  ): Promise<VehicleRouteOtherCost> {
    const vehicleRouteOtherCost =
      await this.vehicleRouteOtherCostRepository.create(data);
    return vehicleRouteOtherCost;
  }
}
