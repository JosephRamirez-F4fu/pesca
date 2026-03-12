import { VehicleRoutesRepository } from "../../repositories/vehicle_routes.repository";
import { CreateVehicleRoutesDto } from "./../../dtos/vehicle_routes/create.dto";

export class UpdateVehicleRoutesUseCase {
  private vehicleRoutesRepository = new VehicleRoutesRepository();
  async execute(id: number, data: CreateVehicleRoutesDto) {
    const vehicleRoutes = await this.vehicleRoutesRepository.update(id, data);
    return vehicleRoutes;
  }
}
