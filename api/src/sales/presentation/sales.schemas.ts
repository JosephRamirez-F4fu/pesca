import { z } from "zod";
import {
  nonNegativeNumberSchema,
  positiveNumberSchema,
  requiredTextSchema,
} from "../../shared/presentation/schemas/common.schemas";

export const clientBodySchema = z.object({
  name: requiredTextSchema,
  phone: requiredTextSchema,
  state: requiredTextSchema,
});

export const loanBodySchema = z.object({
  id_person: positiveNumberSchema,
  id_client: positiveNumberSchema,
  mount: nonNegativeNumberSchema,
  id_charge_operation: positiveNumberSchema,
});

export const loanDetailBodySchema = z.object({
  id_loan: positiveNumberSchema,
  fish: requiredTextSchema,
  weight: nonNegativeNumberSchema,
  price: nonNegativeNumberSchema,
  mount: nonNegativeNumberSchema,
});

export const paymentBodySchema = z.object({
  amount: nonNegativeNumberSchema,
  type: requiredTextSchema,
  id_person: positiveNumberSchema,
  id_client: positiveNumberSchema,
});

export type ClientBody = z.infer<typeof clientBodySchema>;
export type LoanBody = z.infer<typeof loanBodySchema>;
export type LoanDetailBody = z.infer<typeof loanDetailBodySchema>;
export type PaymentBody = z.infer<typeof paymentBodySchema>;
