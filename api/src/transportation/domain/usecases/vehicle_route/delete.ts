import { VehicleRouteRepository } from "../../repositories/vehicle_route.repository";

export class DeleteVehicleRouteUseCase {
  private vehicleRouteRepository = new VehicleRouteRepository();
  async execute(id: number) {
    const vehicleRoute = await this.vehicleRouteRepository.delete(id);
    return vehicleRoute;
  }
}
