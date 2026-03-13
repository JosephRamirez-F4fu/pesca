import { z } from "zod";
import {
  booleanSchema,
  nullableDateInputSchema,
  nonNegativeNumberSchema,
  positiveNumberSchema,
  requiredTextSchema,
} from "../../shared/presentation/schemas/common.schemas";

export const chargerOperationCreateBodySchema = z.object({
  id_travel: positiveNumberSchema,
});

export const chargerOperationUpdateBodySchema = z.object({
  footboard: nonNegativeNumberSchema,
  helper: nonNegativeNumberSchema,
  grocer: nonNegativeNumberSchema,
  boxes: nonNegativeNumberSchema,
  weight: nonNegativeNumberSchema,
  charger: nonNegativeNumberSchema,
  travel_cost: nonNegativeNumberSchema,
  date_canceled: nullableDateInputSchema,
});

export const otherCostChargerOperationBodySchema = z.object({
  description: requiredTextSchema,
  price: nonNegativeNumberSchema,
  id_charger_operation: positiveNumberSchema,
});

export const otherCostChargerOperationUpdateBodySchema = z.object({
  description: requiredTextSchema,
  price: nonNegativeNumberSchema,
  id_charger_operation: positiveNumberSchema,
});

export const vehicleCreateBodySchema = z.object({
  name: requiredTextSchema,
  user: requiredTextSchema,
  plate: requiredTextSchema,
  type: requiredTextSchema,
  phone: requiredTextSchema,
});

export const vehicleUpdateBodySchema = z.object({
  name: requiredTextSchema,
  user: requiredTextSchema,
  plate: requiredTextSchema,
  type: requiredTextSchema,
  phone: requiredTextSchema,
  is_active: booleanSchema,
});

export type ChargerOperationCreateBody = z.infer<
  typeof chargerOperationCreateBodySchema
>;
export type ChargerOperationUpdateBody = z.infer<
  typeof chargerOperationUpdateBodySchema
>;
export type OtherCostChargerOperationBody = z.infer<
  typeof otherCostChargerOperationBodySchema
>;
export type OtherCostChargerOperationUpdateBody = z.infer<
  typeof otherCostChargerOperationUpdateBodySchema
>;
export type VehicleCreateBody = z.infer<typeof vehicleCreateBodySchema>;
export type VehicleUpdateBody = z.infer<typeof vehicleUpdateBodySchema>;
