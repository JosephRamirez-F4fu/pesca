import { PaymentRepository } from "../../repositories/payment.repository";
import { CreatePaymentDto } from "./../../dtos/payment/create.dto";

export class CreatePaymentUseCase {
  private paymentRepository = new PaymentRepository();

  async execute(payment: CreatePaymentDto) {
    const payment_created = await this.paymentRepository.create(payment);

    return payment_created;
  }
}
