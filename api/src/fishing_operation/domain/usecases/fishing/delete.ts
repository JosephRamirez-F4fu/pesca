import { FishingRepository } from "../../repositories/fishing.repository";

export class DeleteFishingUseCase {
  private fishingRepository = new FishingRepository();
  async execute(id: number) {
    return this.fishingRepository.delete(id);
  }
}
