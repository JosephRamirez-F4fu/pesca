import { VehicleRepository } from "../../repositories/vehicle.repository";
import { VehicleCreateDto } from "./../../dtos/vehicle/create.dto";

export class CreateVehicleUseCase {
  private vehicleRepository = new VehicleRepository();

  async execute(data: VehicleCreateDto) {
    const vehicleActive = await this.vehicleRepository.findByNameIsActive(
      data.name
    );
    if (vehicleActive) {
      throw new Error("Vehiculo Activo");
    }
    return this.vehicleRepository.create(data);
  }
}
