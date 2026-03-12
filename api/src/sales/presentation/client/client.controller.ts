import { Response, Request } from "express";

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
    const client = req.body;
    const newClient = await this.createClientUseCase.execute(client);
    res.status(201).json(newClient);
    return;
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const client = req.body;
    await this.updateClientUseCase.execute(id, client);
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.deleteClientUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
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
