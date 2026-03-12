import { db } from "../../../core/config/db";
import { LoanDetail } from "./../entities/loan_detail";
import { CreateLoanDetailDto } from "../dtos/loan_detail/create.dto";

export class LoanDetailRepository {
  async create(loan_detail: CreateLoanDetailDto): Promise<LoanDetail> {
    const loan_detail_created = await db.loan_detail.create({
      data: {
        fish: loan_detail.fish,
        mount: loan_detail.mount,
        id_loan: loan_detail.id_loan,
        weight: loan_detail.weight,
        price: loan_detail.price,
      },
    });

    return loan_detail_created;
  }

  async findAll(): Promise<LoanDetail[]> {
    const loan_details = await db.loan_detail.findMany();

    return loan_details;
  }

  async findById(id: number): Promise<LoanDetail | null> {
    const loan_detail = await db.loan_detail.findUnique({
      where: {
        id,
      },
    });

    return loan_detail;
  }

  async update(
    id: number,
    loan_detail: CreateLoanDetailDto
  ): Promise<LoanDetail> {
    const loan_detail_updated = await db.loan_detail.update({
      where: {
        id,
      },
      data: {
        fish: loan_detail.fish,
        mount: loan_detail.mount,
        id_loan: loan_detail.id_loan,
        weight: loan_detail.weight,
        price: loan_detail.price,
      },
    });

    return loan_detail_updated;
  }

  async delete(id: number): Promise<LoanDetail> {
    const loan_detail_deleted = await db.loan_detail.delete({
      where: {
        id,
      },
    });

    return loan_detail_deleted;
  }
}
