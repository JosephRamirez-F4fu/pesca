import { FishingRepository } from "../../repositories/fishing.repository";

export class GetByIdFishingUseCase {
  private repository = new FishingRepository();
  async execute(id: number) {
    return this.repository.findById(id);
  }
}
