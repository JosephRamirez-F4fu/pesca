import { db } from "../../../core/config/db";
import { conflict, notFound } from "../../../shared/domain/errors/http.error";
import {
  SaleDriverCreateBody,
  SaleDriverUpdateBody,
} from "../../presentation/sales.schemas";

const normalizeName = (value: string) => value.trim().toUpperCase();

export class SaleDriverRepository {
  async create(data: SaleDriverCreateBody) {
    const name = normalizeName(data.name);
    const existing = await db.sale_driver.findUnique({ where: { name } });

    if (existing) {
      throw conflict("Sale driver already exists.");
    }

    return db.sale_driver.create({
      data: {
        name,
        phone: data.phone?.trim() || null,
      },
    });
  }

  async findAll() {
    return db.sale_driver.findMany({
      orderBy: { name: "asc" },
    });
  }

  async update(id: number, data: SaleDriverUpdateBody) {
    const current = await db.sale_driver.findUnique({ where: { id } });

    if (!current) {
      throw notFound("Sale driver not found.");
    }

    const name = normalizeName(data.name);
    const existing = await db.sale_driver.findUnique({ where: { name } });

    if (existing && existing.id !== id) {
      throw conflict("Sale driver already exists.");
    }

    return db.sale_driver.update({
      where: { id },
      data: {
        name,
        phone: data.phone?.trim() || null,
        is_active: data.is_active,
      },
    });
  }
}
