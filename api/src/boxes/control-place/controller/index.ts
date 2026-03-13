import { Request, Response } from "express";
import { ControlPlaceRepository } from "../repositories";
import { notFound } from "../../../shared/domain/errors/http.error";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type {
  ControlPlaceBody,
  IdParams,
} from "../../presentation/boxes.schemas";
export class ControlPlaceController {
  private repository = new ControlPlaceRepository();
  create = async (req: Request, res: Response) => {
    const { body } = getValidated<Record<string, never>, ControlPlaceBody>(req);
    const controlPlace = await this.repository.create(body);
    res.status(201).json(controlPlace);
    return;
  };

  findAll = async (_req: Request, res: Response) => {
    const controlPlace = await this.repository.findAll();
    res.status(200).json(controlPlace);
    return;
  };

  findById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const controlPlace = await this.repository.findById(id);
    if (!controlPlace) {
      throw notFound("Control Place not found");
    }
    res.status(200).json(controlPlace);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body } = getValidated<IdParams, ControlPlaceBody>(req);
    const { id } = params;
    await this.repository.update(id, body);
    res.status(200).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.repository.delete(id);
    res.status(200).send();
    return;
  };

  findControlBoxesById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const controlPlace = await this.repository.findControlBoxesById(id);
    res.status(200).json(controlPlace);
    return;
  };
}
