import { PaymentRepository } from "../../repositories/payment.repository";
import { CreatePaymentDto } from "./../../dtos/payment/create.dto";

export class UpdatePaymentUseCase {
  private paymentRepository = new PaymentRepository();

  async execute(id: number, payment: CreatePaymentDto) {
    return await this.paymentRepository.update(id, payment);
  }
}
