import {
  VehicleRoute,
  VehicleRouteWithDetailAndVehicle,
} from "../../entities/vehicle_route";
import { VehicleRouteRepository } from "../../repositories/vehicle_route.repository";

export class GetAllVehicleRouteUseCase {
  private vehicleRouteRepository = new VehicleRouteRepository();
  async execute(): Promise<VehicleRoute[]> {
    const vehicleRoutes = await this.vehicleRouteRepository.findAll();

    const sorted = createdGroupbyNext(vehicleRoutes);

    return sorted;
  }
}

function createdGroupbyNext(vehicleRoutes: VehicleRouteWithDetailAndVehicle[]) {
  let groups: VehicleRouteWithDetailAndVehicle[][] = [];
  let stackvehicleRoutes = [...vehicleRoutes];

  let gwithnext = vehicleRoutes.filter(
    (v) => v.vehicle_route_detail?.id_next_route
  );

  let idsToDelete = new Set<number>();

  for (let i = 0; i < gwithnext.length; i++) {
    let next = gwithnext[i].vehicle_route_detail?.id_next_route;
    let nextRoute = gwithnext.find((v) => v.vehicle_route_detail?.id === next);
    if (nextRoute) {
      idsToDelete.add(nextRoute.id);
    }
  }

  gwithnext = gwithnext.filter((v) => !idsToDelete.has(v.id));

  stackvehicleRoutes = stackvehicleRoutes.filter(
    (v) => !gwithnext.find((vr) => vr.id === v.id)
  );

  gwithnext.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  gwithnext.forEach((v) => {
    let group = [v];
    let next = v.vehicle_route_detail?.id_next_route;
    let nextRoute = stackvehicleRoutes.find(
      (vr) => vr.vehicle_route_detail?.id === next
    );
    while (nextRoute != undefined) {
      group.push(nextRoute);
      stackvehicleRoutes = stackvehicleRoutes.filter(
        (vr) =>
          nextRoute &&
          vr.vehicle_route_detail?.id !== nextRoute.vehicle_route_detail?.id
      );
      next = nextRoute.vehicle_route_detail?.id_next_route;
      nextRoute = stackvehicleRoutes.find(
        (vr) => vr.vehicle_route_detail?.id === next
      );
    }
    groups.push(group);
  });

  stackvehicleRoutes.forEach((v) => {
    groups.push([v]);
  });

  groups.forEach((group) => {
    group.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  });

  groups.sort((a, b) => b[0].createdAt.getTime() - a[0].createdAt.getTime());

  return groups.flat();
}
