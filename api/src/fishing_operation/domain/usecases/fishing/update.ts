import { FishingRepository } from "../../repositories/fishing.repository";

import { FishingCreateDto } from "../../dtos/fishing/create.dto";

export class UpdateFishingUseCase {
  private fishingRepository = new FishingRepository();
  async execute(id: number, fishing: FishingCreateDto) {
    return this.fishingRepository.update(id, fishing);
  }
}
