import { Route } from "../../entities/route";
import { CreateRouteDto } from "../../dtos/route/create.dto";
import { RouteRepository } from "../../repositories/route.repository";

export class CreateRouteUseCase {
  private routeRepository = new RouteRepository();
  async execute(data: CreateRouteDto): Promise<Route> {
    const route = await this.routeRepository.create(data);
    return route;
  }
}
