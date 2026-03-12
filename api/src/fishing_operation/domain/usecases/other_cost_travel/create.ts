import { OtherCostTravelRepository } from "../../repositories/other_cost_travel.repository";
import { OtherCostTravelCreateDto } from "./../../dtos/other_cost_travel/create.dto";

export class CreateOtherCostTravelUseCase {
  private otherCostTravelRepository = new OtherCostTravelRepository();

  async execute(otherCostTravel: OtherCostTravelCreateDto) {
    return this.otherCostTravelRepository.create(otherCostTravel);
  }
}
