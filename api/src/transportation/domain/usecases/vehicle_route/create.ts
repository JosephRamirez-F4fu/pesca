import { VehicleRoute } from "../../entities/vehicle_route";
import { CreateVehicleRouteDto } from "../../dtos/vehicle_route/create.dto";
import { VehicleRouteRepository } from "../../repositories/vehicle_route.repository";
import { VehicleRouteDetailRepository } from "./../../repositories/vehicle_route_detail.repository";

export class CreateVehicleRouteUseCase {
  private vehicleRouteRepository = new VehicleRouteRepository();
  private vehicleRouteDetailRepository = new VehicleRouteDetailRepository();
  async execute(data: CreateVehicleRouteDto): Promise<VehicleRoute> {
    const vehicleRoute = await this.vehicleRouteRepository.create(data);
    await this.vehicleRouteDetailRepository.create({
      id_vehicle_route: vehicleRoute.id,
      dateEnd: null,
      dateInit: vehicleRoute.createdAt,
      taxes_in: 0,
      taxes_out: 0,
      destiny: null,
      point_charge: null,
      who_destination: null,
      id_next_route: null,
      changeGiven: false,
    });
    return vehicleRoute;
  }
}
