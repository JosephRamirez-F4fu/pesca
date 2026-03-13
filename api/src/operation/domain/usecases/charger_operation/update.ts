import { ChargerOperationRepository } from "../../repositories/charger_opertaion.repository";
import { ChargerOperationUpdateDto } from "../../dtos/charger_opetaion/create.dto";

export class UpdateChargerOperationUseCase {
  private chargerOperationRepository = new ChargerOperationRepository();
  execute(id: number, data: ChargerOperationUpdateDto) {
    return this.chargerOperationRepository.update(id, data);
  }
}
