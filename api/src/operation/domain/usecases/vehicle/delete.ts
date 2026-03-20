import { VehicleRepository } from "../../repositories/vehicle.repository";

export class DeleteVehicleUseCase {
  private vehicleRepository = new VehicleRepository();
  execute(id: number) {
    return this.vehicleRepository.delete(id);
  }
}
