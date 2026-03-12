import { FishingRepository } from "../../repositories/fishing.repository";

export class GetAllFishingUseCase {
  private fishingRepository = new FishingRepository();
  async execute() {
    return this.fishingRepository.findAll();
  }
}
