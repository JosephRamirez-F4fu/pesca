import { VehicleRoutesRepository } from "../../repositories/vehicle_routes.repository";

export class DeleteVehicleRoutesUseCase {
  private vehicleRoutesRepository = new VehicleRoutesRepository();
  async execute(id: number) {
    const vehicleRoutes = await this.vehicleRoutesRepository.delete(id);
    return vehicleRoutes;
  }
}
