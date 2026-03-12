import { db } from "../../../core/config/db";
import { Vehicle } from "../entities/vehicle";
import { VehicleCreateDto } from "../dtos/vehicle/create.dto";

export class VehicleRepository {
  async create(data: VehicleCreateDto): Promise<Vehicle> {
    const vehicle_created = db.vehicle.create({
      data: {
        name: data.name,
        user: data.user,
        plate: data.plate,
        type: data.type,
        phone: data.phone,
      },
    });
    return vehicle_created;
  }

  async findById(id: number): Promise<Vehicle | null> {
    const vehicle = db.vehicle.findUnique({
      where: {
        id: id,
      },
    });
    return vehicle;
  }

  async findAll(): Promise<Vehicle[]> {
    const vehicle = db.vehicle.findMany();
    return vehicle;
  }

  async update(id: number, data: VehicleCreateDto): Promise<void> {
    await db.vehicle.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        user: data.user,
        plate: data.plate,
        type: data.type,
        phone: data.phone,
        is_active: data.is_active,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await db.vehicle.delete({
      where: {
        id: id,
      },
    });
  }

  async findByNameIsActive(name: string): Promise<Vehicle | null> {
    const vehicle = db.vehicle.findFirst({
      where: {
        name: name,
        is_active: true,
      },
    });
    return vehicle;
  }
}
