import { VehicleRoutesRepository } from "../../repositories/vehicle_routes.repository";

export class GetAllVehicleRoutesUseCase {
  private vehicleRoutesRepository = new VehicleRoutesRepository();
  async execute() {
    const vehicleRoutes = await this.vehicleRoutesRepository.findAll();
    return vehicleRoutes;
  }
}
