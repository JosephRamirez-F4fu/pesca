import { UpdateVehicleRouteDto } from "../../dtos/vehicle_route/update.dto";
import { VehicleRouteRepository } from "../../repositories/vehicle_route.repository";

export class UpdateVehicleRouteUseCase {
  private vehicleRouteRepository = new VehicleRouteRepository();
  async execute(id: number, data: UpdateVehicleRouteDto) {
    const vehicleRoute = await this.vehicleRouteRepository.update(id, data);
    return vehicleRoute;
  }
}
