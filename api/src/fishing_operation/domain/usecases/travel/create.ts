import { TravelRepository } from "../../repositories/travel.repository";

import { TravelCreateDto } from "./../../dtos/travel/create.dto";
import { CreateChargerOperationUseCase } from "../../../../operation/domain/usecases/charger_operation";

export class CreateTravelUseCase {
  private travelRepository = new TravelRepository();
  private createChargerOperationUseCase = new CreateChargerOperationUseCase();
  async execute(travel: TravelCreateDto) {
    if (travel.code.length === 0) {
      throw new Error("Code is required");
    }
    if (travel.createdAt === null) {
      throw new Error("Date is required");
    }
    const travel_created = await this.travelRepository.create(travel);
    await this.createChargerOperationUseCase.execute(travel_created.id);
    const travel_created_with_charger_operation =
      await this.travelRepository.findById(travel_created.id);
    return travel_created_with_charger_operation;
  }
}
