import { FishingRepository } from "../../repositories/fishing.repository";

export class GetFishingByTravelIdUseCase {
  private repository = new FishingRepository();
  async execute(id: number) {
    return this.repository.findByTravelId(id);
  }
}
