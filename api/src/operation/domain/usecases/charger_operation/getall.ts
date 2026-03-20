import { ChargerOperationRepository } from "../../repositories/charger_opertaion.repository";

export class GetAllChargerOperationUseCase {
  private chargerOperationRepository = new ChargerOperationRepository();
  async execute() {
    return this.chargerOperationRepository.findAll();
  }
}
