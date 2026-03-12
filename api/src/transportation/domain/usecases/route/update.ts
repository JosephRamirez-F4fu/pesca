import { Route } from "../../entities/route";
import { CreateRouteDto } from "../../dtos/route/create.dto";
import { RouteRepository } from "../../repositories/route.repository";

export class UpdateRouteUseCase {
  private routeRepository = new RouteRepository();
  async execute(id: number, data: CreateRouteDto): Promise<Route> {
    const route = await this.routeRepository.update(id, data);
    return route;
  }
}
