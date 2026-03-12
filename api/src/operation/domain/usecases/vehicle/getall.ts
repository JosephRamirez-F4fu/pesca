import { VehicleRepository } from "../../repositories/vehicle.repository";

export class GetAllVehicleUseCase {
  private vehicleRepository = new VehicleRepository();
  async execute() {
    return this.vehicleRepository.findAll();
  }
}
