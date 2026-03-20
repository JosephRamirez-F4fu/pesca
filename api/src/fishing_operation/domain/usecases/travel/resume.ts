import { TravelRepository } from "../../repositories/travel.repository";
import { OtherCostTravelRepository } from "../../repositories/other_cost_travel.repository";
import { FishingRepository } from "../../repositories/fishing.repository";

export class ResumeTravelUseCase {
  private travelRepository = new TravelRepository();
  private otherCostTravelRepository = new OtherCostTravelRepository();
  private fishingRepository = new FishingRepository();

  async execute(id: number) {
    const travel = await this.travelRepository.findById(id);
    const otherCostTravels =
      await this.otherCostTravelRepository.findByTravelId(id);
    const fishings = await this.fishingRepository.findByTravelId(id);
    return { travel, otherCostTravels, fishings };
  }
}
