import { LoanRepository } from "../../repositories/loan.repository";

export class FindByLoanUseCase {
  private loanRepository = new LoanRepository();
  async execute(id: number) {
    const loan = await this.loanRepository.findById(id);
    return loan;
  }
}
