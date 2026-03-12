export interface CreatePaymentDto {
  amount: number;
  type: string;
  id_person: number;
  id_client: number;
}
