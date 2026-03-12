import { ChargerOperationRepository } from "../../repositories/charger_opertaion.repository";
import { ChargerOperation } from "../../entities/charger_operation";
export class CreateChargerOperationUseCase {
  private chargerOperationRepository = new ChargerOperationRepository();
  execute(id_travel: number): Promise<ChargerOperation> {
    return this.chargerOperationRepository.create(id_travel);
  }
}
