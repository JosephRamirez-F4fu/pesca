import { db } from "../../../core/config/db";
import { Loan } from "./../entities/loan";
import { CreateLoanDto } from "../dtos/loan/create.dto";

export class LoanRepository {
  async create(loan: CreateLoanDto): Promise<Loan> {
    const loan_created = await db.loan.create({
      data: {
        mount: loan.mount,
        id_client: loan.id_client,
        id_charge_operation: loan.id_charge_operation,
        id_person: loan.id_person,
      },
    });

    return loan_created;
  }

  async findAll(): Promise<Loan[]> {
    const loans = await db.loan.findMany();

    return loans;
  }

  async findById(id: number): Promise<Loan | null> {
    const loan = await db.loan.findUnique({
      where: {
        id,
      },
    });

    return loan;
  }

  async update(id: number, loan: CreateLoanDto): Promise<Loan> {
    const loan_updated = await db.loan.update({
      where: {
        id,
      },
      data: {
        mount: loan.mount,
        id_client: loan.id_client,
        id_charge_operation: loan.id_charge_operation,
        id_person: loan.id_person,
      },
    });

    return loan_updated;
  }

  async delete(id: number): Promise<Loan> {
    const loan_deleted = await db.loan.delete({
      where: {
        id,
      },
    });

    return loan_deleted;
  }
}
