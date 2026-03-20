import { VehicleRoutesRepository } from "../../repositories/vehicle_routes.repository";
import { UpdateVehicleRoutesDto } from "./../../dtos/vehicle_routes/update.dto";

export class UpdateVehicleRoutesUseCase {
  private vehicleRoutesRepository = new VehicleRoutesRepository();
  async execute(id: number, data: UpdateVehicleRoutesDto) {
    const vehicleRoutes = await this.vehicleRoutesRepository.update(id, data);
    return vehicleRoutes;
  }
}
