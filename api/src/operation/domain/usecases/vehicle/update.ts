import { VehicleRepository } from "../../repositories/vehicle.repository";
import { VehicleCreateDto } from "./../../dtos/vehicle/create.dto";

export class UpdateVehicleUseCase {
  private vehicleRepository = new VehicleRepository();
  async execute(id: number, data: VehicleCreateDto) {
    const vehicle = await this.vehicleRepository.findByNameIsActive(data.name);
    if (vehicle && vehicle.id !== id) {
      throw new Error("Vehiculo es usado por otro usuario");
    }
    return this.vehicleRepository.update(id, data);
  }
}
