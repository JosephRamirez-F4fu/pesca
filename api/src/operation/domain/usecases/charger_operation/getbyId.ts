import { ChargerOperationRepository } from "./../../repositories/charger_opertaion.repository";

export class FindByChargerOperationUseCase {
  private chargerOperationRepository = new ChargerOperationRepository();
  async execute(id: number) {
    return this.chargerOperationRepository.findById(id);
  }
}
