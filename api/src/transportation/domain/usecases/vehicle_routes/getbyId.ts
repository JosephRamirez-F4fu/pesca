import { VehicleRoutesRepository } from "../../repositories/vehicle_routes.repository";

export class FindByIdVehicleRoutesUseCase {
  private vehicleRoutesRepository = new VehicleRoutesRepository();
  async execute(id: number) {
    const vehicleRoutes = await this.vehicleRoutesRepository.findById(id);
    return vehicleRoutes;
  }
}
