import { CreateVehicleRouteDto } from "../../dtos/vehicle_route/create.dto";
import { VehicleRouteRepository } from "../../repositories/vehicle_route.repository";

export class UpdateVehicleRouteUseCase {
  private vehicleRouteRepository = new VehicleRouteRepository();
  async execute(id: number, data: CreateVehicleRouteDto) {
    const vehicleRoute = await this.vehicleRouteRepository.update(id, data);
    return vehicleRoute;
  }
}
