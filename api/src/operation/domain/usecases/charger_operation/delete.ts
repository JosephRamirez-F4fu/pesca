import { ChargerOperationRepository } from "../../repositories/charger_opertaion.repository";

export class DeleteChargerOperationUseCase {
  private chargerOperationRepository = new ChargerOperationRepository();
  execute(id: number): Promise<void> {
    return this.chargerOperationRepository.delete(id);
  }
}
