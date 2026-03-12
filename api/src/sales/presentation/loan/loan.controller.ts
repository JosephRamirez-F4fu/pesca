import { Response, Request } from "express";

import {
  CreateLoanUseCase,
  UpdateLoanUseCase,
  DeleteLoanUseCase,
  FindByLoanUseCase,
  GetAllLoanUseCase,
} from "../../domain/usecases/loan";

export class LoanController {
  private createLoanUseCase = new CreateLoanUseCase();
  private updateLoanUseCase = new UpdateLoanUseCase();
  private deleteLoanUseCase = new DeleteLoanUseCase();
  private findByLoanUseCase = new FindByLoanUseCase();
  private getAllLoanUseCase = new GetAllLoanUseCase();

  create = async (req: Request, res: Response) => {
    const loan = req.body;
    const newLoan = await this.createLoanUseCase.execute(loan);
    res.status(201).json(newLoan);
    return;
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const loan = req.body;
    await this.updateLoanUseCase.execute(id, loan);
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.deleteLoanUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const loan = await this.findByLoanUseCase.execute(id);
    res.status(200).json(loan);
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const loan = await this.getAllLoanUseCase.execute();
    res.status(200).json(loan);
    return;
  };
}
