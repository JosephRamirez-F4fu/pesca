import { db } from "../../../core/config/db";
import { conflict, notFound } from "../../../shared/domain/errors/http.error";
import {
  ProductCreateBody,
  ProductUpdateBody,
} from "../../presentation/sales.schemas";

const normalizeName = (value: string) => value.trim().toUpperCase();

export class ProductRepository {
  async create(data: ProductCreateBody) {
    const name = normalizeName(data.name);
    const existing = await db.product.findUnique({ where: { name } });

    if (existing) {
      throw conflict("Product already exists.");
    }

    return db.product.create({
      data: {
        name,
      },
    });
  }

  async findAll(search?: string) {
    const name = search?.trim().toUpperCase();

    return db.product.findMany({
      where: name
        ? {
            name: {
              contains: name,
            },
          }
        : undefined,
      orderBy: { name: "asc" },
      take: 25,
    });
  }

  async update(id: number, data: ProductUpdateBody) {
    const current = await db.product.findUnique({ where: { id } });

    if (!current) {
      throw notFound("Product not found.");
    }

    const name = normalizeName(data.name);
    const existing = await db.product.findUnique({ where: { name } });

    if (existing && existing.id !== id) {
      throw conflict("Product already exists.");
    }

    return db.product.update({
      where: { id },
      data: {
        name,
        is_active: data.is_active,
      },
    });
  }
}
