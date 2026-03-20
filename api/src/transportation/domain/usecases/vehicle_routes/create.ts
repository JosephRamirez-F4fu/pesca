import { VehicleRoutesRepository } from "../../repositories/vehicle_routes.repository";
import { VehicleRoutes } from "../../entities/vehicle_routes";
import { CreateVehicleRoutesDto } from "./../../dtos/vehicle_routes/create.dto";

export class CreateVehicleRoutesUseCase {
  private vehicleRoutesRepository = new VehicleRoutesRepository();
  async execute(data: CreateVehicleRoutesDto): Promise<VehicleRoutes> {
    const vehicleRoutes = await this.vehicleRoutesRepository.create(data);
    return vehicleRoutes;
  }
}
