import { VehicleRouteRepository } from "../../repositories/vehicle_route.repository";

export class FindByIdVehicleRouteUseCase {
  private vehicleRouteRepository = new VehicleRouteRepository();
  async execute(id: number) {
    const vehicleRoute = await this.vehicleRouteRepository.findById(id);
    return vehicleRoute;
  }
}
