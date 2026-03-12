import { LoanDetailRepository } from "../../repositories/loan_detail.repository";

export class DeleteLoanDetailUseCase {
  private loanDetailRepository = new LoanDetailRepository();
  async execute(id: number) {
    const loanDetail = await this.loanDetailRepository.delete(id);
    return loanDetail;
  }
}
