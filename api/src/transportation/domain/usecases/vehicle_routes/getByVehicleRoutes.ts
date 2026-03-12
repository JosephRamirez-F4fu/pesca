import { VehicleRoutesRepository } from "../../repositories/vehicle_routes.repository";

export class FindByVehicleRoutesUseCase {
  private vehicleRoutesRepository = new VehicleRoutesRepository();
  async execute(id: number) {
    const vehicleRoutes =
      await this.vehicleRoutesRepository.findByVehicleRouteId(id);
    return vehicleRoutes;
  }
}
