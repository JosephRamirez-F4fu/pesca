import { VehicleRepository } from "../../repositories/vehicle.repository";

export class GetByIdVehicleUseCase {
  private vehicleRepository = new VehicleRepository();
  async execute(id: number) {
    return this.vehicleRepository.findById(id);
  }
}
