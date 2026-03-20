import { Request, Response } from "express";
import { BoatRepository } from "./../../domain/repositories/boat.repository";
import { notFound } from "../../../shared/domain/errors/http.error";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type { BoatBody } from "../fishing_operation.schemas";

export class BoatController {
  private BoatRepository = new BoatRepository();
  create = async (req: Request, res: Response) => {
    const { body: boat } = getValidated<Record<string, never>, BoatBody>(req);
    const newBoat = await this.BoatRepository.create(boat);
    res.status(201).json(newBoat);
    return;
  };
  update = async (req: Request, res: Response) => {
    const { params, body: boat } = getValidated<IdParams, BoatBody>(req);
    const { id } = params;
    await this.BoatRepository.update(id, boat);
    res.status(204).send();
    return;
  };
  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.BoatRepository.delete(id);
    res.status(204).send();
    return;
  };
  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const boat = await this.BoatRepository.findById(id);
    if (!boat) {
      throw notFound("Boat not found.");
    }
    res.status(200).json(boat);
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const boats = await this.BoatRepository.findAll();
    res.status(200).json(boats);
    return;
  };
}
