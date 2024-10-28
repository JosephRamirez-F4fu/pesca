import { FlotaRepositoryInterface } from ".";

export class FlotaControllerInterface {
  private readonly FlotaRepository: FlotaRepositoryInterface;
  constructor(FlotaRepository: FlotaRepositoryInterface) {
    this.FlotaRepository = FlotaRepository;
  }
}
