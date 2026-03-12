import { db } from "../../../core/config/db";
import { Payment } from "./../entities/payment";
import { CreatePaymentDto } from "./../dtos/payment/create.dto";

export class PaymentRepository {
  async create(payment: CreatePaymentDto): Promise<Payment> {
    const payment_created = await db.payment.create({
      data: {
        amount: payment.amount,
        id_person: payment.id_person,
        id_client: payment.id_client,
        type: payment.type,
      },
    });

    return payment_created;
  }

  async findAll(): Promise<Payment[]> {
    const payments = await db.payment.findMany();

    return payments;
  }

  async findById(id: number): Promise<Payment | null> {
    const payment = await db.payment.findUnique({
      where: {
        id,
      },
    });

    return payment;
  }

  async update(id: number, payment: CreatePaymentDto): Promise<Payment> {
    const payment_updated = await db.payment.update({
      where: {
        id,
      },
      data: {
        amount: payment.amount,
        id_person: payment.id_person,
        id_client: payment.id_client,
        type: payment.type,
      },
    });

    return payment_updated;
  }

  async delete(id: number): Promise<Payment> {
    const payment_deleted = await db.payment.delete({
      where: {
        id,
      },
    });

    return payment_deleted;
  }
}
