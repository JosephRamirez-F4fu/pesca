import { LoanRepository } from "../../repositories/loan.repository";

export class DeleteLoanUseCase {
  private loanRepository = new LoanRepository();

  async execute(id: number): Promise<void> {
    await this.loanRepository.delete(id);
  }
}
