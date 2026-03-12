import { FishingRepository } from "../../repositories/fishing.repository";
import { FishingCreateDto } from "../../dtos/fishing/create.dto";
export class CreateFishingUseCase {
  private fishingRepository = new FishingRepository();
  async execute(fishing: FishingCreateDto) {
    return this.fishingRepository.create(fishing);
  }
}
