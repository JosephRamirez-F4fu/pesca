import { VehicleRouteOtherCostRepository } from "./../../repositories/vehicle_route_other_cost.repository";

export class GetByVehicleRouteUseCase {
  private repository = new VehicleRouteOtherCostRepository();

  async execute(id: number) {
    const vehicleRouteOtherCosts = await this.repository.findByVehicleRouteId(
      id
    );
    return vehicleRouteOtherCosts;
  }
}
