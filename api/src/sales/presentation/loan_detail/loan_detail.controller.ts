import { Response, Request } from "express";

import {
  CreateLoanDetailUseCase,
  UpdateLoanDetailUseCase,
  DeleteLoanDetailUseCase,
  FindByLoanDetailUseCase,
  GetAllLoanDetailUseCase,
} from "../../domain/usecases/loan_detail";

export class LoanDetailController {
  private createLoanDetailUseCase = new CreateLoanDetailUseCase();
  private updateLoanDetailUseCase = new UpdateLoanDetailUseCase();
  private deleteLoanDetailUseCase = new DeleteLoanDetailUseCase();
  private findByLoanDetailUseCase = new FindByLoanDetailUseCase();
  private getAllLoanDetailUseCase = new GetAllLoanDetailUseCase();

  create = async (req: Request, res: Response) => {
    const loanDetail = req.body;
    const newLoanDetail = await this.createLoanDetailUseCase.execute(
      loanDetail
    );
    res.status(201).json(newLoanDetail);
    return;
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const loanDetail = req.body;
    await this.updateLoanDetailUseCase.execute(id, loanDetail);
    res.status(204).send();
    return;
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.deleteLoanDetailUseCase.execute(id);
    res.status(204).send();
    return;
  };

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const loanDetail = await this.findByLoanDetailUseCase.execute(id);
    res.status(200).json(loanDetail);
    return;
  };

  getAll = async (req: Request, res: Response) => {
    const loanDetail = await this.getAllLoanDetailUseCase.execute();
    res.status(200).json(loanDetail);
    return;
  };
}
