import { LoanDetailRepository } from "../../repositories/loan_detail.repository";

export class FindByLoanDetailUseCase {
  private loanDetailRepository = new LoanDetailRepository();
  async execute(id: number) {
    const loanDetail = await this.loanDetailRepository.findById(id);
    return loanDetail;
  }
}
