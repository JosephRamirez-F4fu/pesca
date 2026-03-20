import { db } from "../../../core/config/db";
import { conflict, notFound } from "../../../shared/domain/errors/http.error";
import {
  SaleVehicleCreateBody,
  SaleVehicleUpdateBody,
} from "../../presentation/sales.schemas";

const normalizeText = (value: string) => value.trim().toUpperCase();

export class SaleVehicleRepository {
  async create(data: SaleVehicleCreateBody) {
    const code = normalizeText(data.code);
    const plate = normalizeText(data.plate);
    const existing = await db.sale_vehicle.findFirst({
      where: {
        OR: [{ code }, { plate }],
      },
    });

    if (existing) {
      throw conflict("Sale vehicle already exists.");
    }

    return db.sale_vehicle.create({
      data: {
        code,
        plate,
        description: data.description?.trim() || null,
      },
    });
  }

  async findAll() {
    return db.sale_vehicle.findMany({
      orderBy: { code: "asc" },
    });
  }

  async update(id: number, data: SaleVehicleUpdateBody) {
    const current = await db.sale_vehicle.findUnique({ where: { id } });

    if (!current) {
      throw notFound("Sale vehicle not found.");
    }

    const code = normalizeText(data.code);
    const plate = normalizeText(data.plate);
    const existing = await db.sale_vehicle.findFirst({
      where: {
        OR: [{ code }, { plate }],
      },
    });

    if (existing && existing.id !== id) {
      throw conflict("Sale vehicle already exists.");
    }

    return db.sale_vehicle.update({
      where: { id },
      data: {
        code,
        plate,
        description: data.description?.trim() || null,
        is_active: data.is_active,
      },
    });
  }
}
