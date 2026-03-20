import { Request, Response } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type { ProductCreateBody, ProductUpdateBody } from "../sales.schemas";
import { ProductRepository } from "../../domain/repositories/product.repository";

export class ProductController {
  private repository = new ProductRepository();

  create = async (req: Request, res: Response) => {
    const { body } = getValidated<Record<string, never>, ProductCreateBody>(req);
    const product = await this.repository.create(body);
    res.status(201).json(product);
  };

  getAll = async (req: Request, res: Response) => {
    const query = typeof req.query.q === "string" ? req.query.q : undefined;
    const products = await this.repository.findAll(query);
    res.status(200).json(products);
  };

  update = async (req: Request, res: Response) => {
    const { params, body } = getValidated<IdParams, ProductUpdateBody>(req);
    const product = await this.repository.update(params.id, body);
    res.status(200).json(product);
  };
}
