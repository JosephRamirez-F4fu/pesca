import { Response, Request } from "express";

import {
  CreatePaymentUseCase,
  UpdatePaymentUseCase,
  DeletePaymentUseCase,
  FindByPaymentUseCase,
  GetAllPaymentUseCase,
} from "../../domain/usecases/payment";

export class PaymentController {
  private createPaymentUseCase = new CreatePaymentUseCase();
  private updatePaymentUseCase = new UpdatePaymentUseCase();
  private deletePaymentUseCase = new DeletePaymentUseCase();
  private findByPaymentUseCase = new FindByPaymentUseCase();
  private getAllPaymentUseCase = new GetAllPaymentUseCase();

  create = async (req: Request, res: Response) => {
    const payment = req.body;
    const newPayment = await this.createPaymentUseCase.execute(payment);
    res.status(201).json(newPayment);
    return;
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const payment = req.body;
    await this.updatePaymentUseCase.execute(id, payment);
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.deletePaymentUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const payment = await this.findByPaymentUseCase.execute(id);
    res.status(200).json(payment);
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const payment = await this.getAllPaymentUseCase.execute();
    res.status(200).json(payment);
    return;
  };
}
