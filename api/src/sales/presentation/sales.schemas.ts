import { z } from "zod";
import {
  booleanSchema,
  dateInputSchema,
  nonNegativeNumberSchema,
  nullableTextSchema,
  positiveNumberSchema,
  requiredTextSchema,
} from "../../shared/presentation/schemas/common.schemas";

const optionalTextSchema = z
  .string()
  .trim()
  .transform((value) => value || undefined)
  .optional();

const saleStatusSchema = z.enum(["draft", "closed"]);

export const saleDriverCreateBodySchema = z.object({
  name: requiredTextSchema,
  phone: optionalTextSchema,
});

export const saleDriverUpdateBodySchema = z.object({
  name: requiredTextSchema,
  phone: optionalTextSchema,
  is_active: booleanSchema,
});

export const saleVehicleCreateBodySchema = z.object({
  code: requiredTextSchema,
  plate: requiredTextSchema,
  description: optionalTextSchema,
});

export const saleVehicleUpdateBodySchema = z.object({
  code: requiredTextSchema,
  plate: requiredTextSchema,
  description: optionalTextSchema,
  is_active: booleanSchema,
});

export const productCreateBodySchema = z.object({
  name: requiredTextSchema,
});

export const productUpdateBodySchema = z.object({
  name: requiredTextSchema,
  is_active: booleanSchema,
});

export const saleBalanceCreateBodySchema = z.object({
  sale_date: dateInputSchema,
  id_sale_driver: positiveNumberSchema,
  id_sale_vehicle: positiveNumberSchema,
  boxes_arrived: nonNegativeNumberSchema.int(),
  boxes_sold: nonNegativeNumberSchema.int(),
  empty_boxes: nonNegativeNumberSchema.int().optional().default(0),
  notes: optionalTextSchema,
});

export const saleBalanceUpdateBodySchema = z.object({
  sale_date: dateInputSchema,
  id_sale_driver: positiveNumberSchema,
  id_sale_vehicle: positiveNumberSchema,
  boxes_arrived: nonNegativeNumberSchema.int(),
  boxes_sold: nonNegativeNumberSchema.int(),
  empty_boxes: nonNegativeNumberSchema.int().optional().default(0),
  notes: optionalTextSchema,
  status: saleStatusSchema,
});

export const saleBalanceDetailCreateBodySchema = z.object({
  id_product: positiveNumberSchema,
  variation: nullableTextSchema.optional(),
  boxes_sold: nonNegativeNumberSchema.int().optional().default(0),
  weight_sold: nonNegativeNumberSchema,
  unit_price: nonNegativeNumberSchema,
});

export const saleBalanceDetailUpdateBodySchema =
  saleBalanceDetailCreateBodySchema;

export type SaleDriverCreateBody = z.infer<typeof saleDriverCreateBodySchema>;
export type SaleDriverUpdateBody = z.infer<typeof saleDriverUpdateBodySchema>;
export type SaleVehicleCreateBody = z.infer<typeof saleVehicleCreateBodySchema>;
export type SaleVehicleUpdateBody = z.infer<typeof saleVehicleUpdateBodySchema>;
export type ProductCreateBody = z.infer<typeof productCreateBodySchema>;
export type ProductUpdateBody = z.infer<typeof productUpdateBodySchema>;
export type SaleBalanceCreateBody = z.infer<typeof saleBalanceCreateBodySchema>;
export type SaleBalanceUpdateBody = z.infer<typeof saleBalanceUpdateBodySchema>;
export type SaleBalanceDetailCreateBody = z.infer<
  typeof saleBalanceDetailCreateBodySchema
>;
export type SaleBalanceDetailUpdateBody = z.infer<
  typeof saleBalanceDetailUpdateBodySchema
>;
