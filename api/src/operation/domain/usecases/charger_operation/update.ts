import { ChargerOperationRepository } from "../../repositories/charger_opertaion.repository";
import { ChargerOperationCreateDto } from "../../dtos/charger_opetaion/create.dto";

export class UpdateChargerOperationUseCase {
  private chargerOperationRepository = new ChargerOperationRepository();
  execute(id: number, data: ChargerOperationCreateDto) {
    return this.chargerOperationRepository.update(id, data);
  }
}
