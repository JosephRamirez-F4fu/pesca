import { Response, Request } from "express";
import { getValidated } from "../../../shared/presentation/types/validated-request";
import type { IdParams } from "../../../shared/presentation/schemas/common.schemas";
import type { ClientBody } from "../sales.schemas";

import {
  CreateClientUseCase,
  UpdateClientUseCase,
  DeleteClientUseCase,
  FindByClientUseCase,
  GetAllClientUseCase,
} from "../../domain/usecases/client";

export class ClientController {
  private createClientUseCase = new CreateClientUseCase();
  private updateClientUseCase = new UpdateClientUseCase();
  private deleteClientUseCase = new DeleteClientUseCase();
  private findByClientUseCase = new FindByClientUseCase();
  private getAllClientUseCase = new GetAllClientUseCase();

  create = async (req: Request, res: Response) => {
    const { body: client } = getValidated<Record<string, never>, ClientBody>(
      req
    );
    const newClient = await this.createClientUseCase.execute(client);
    res.status(201).json(newClient);
    return;
  };

  update = async (req: Request, res: Response) => {
    const { params, body: client } = getValidated<IdParams, ClientBody>(req);
    const { id } = params;
    await this.updateClientUseCase.execute(id, client);
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    await this.deleteClientUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getById = async (req: Request, res: Response) => {
    const { params } = getValidated<IdParams>(req);
    const { id } = params;
    const client = await this.findByClientUseCase.execute(id);
    res.status(200).json(client);
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const client = await this.getAllClientUseCase.execute();
    res.status(200).json(client);
    return;
  };
}
