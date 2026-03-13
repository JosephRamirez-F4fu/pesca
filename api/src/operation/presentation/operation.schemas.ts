import { z } from "zod";
import {
  booleanSchema,
  nonNegativeNumberSchema,
  positiveNumberSchema,
  requiredTextSchema,
} from "../../shared/presentation/schemas/common.schemas";

export const chargerOperationBodySchema = z.object({
  id_travel: positiveNumberSchema,
  footboard: nonNegativeNumberSchema,
  helper: nonNegativeNumberSchema,
  grocer: nonNegativeNumberSchema,
  boxes: nonNegativeNumberSchema,
  weight: nonNegativeNumberSchema,
  charger: nonNegativeNumberSchema,
  travel_cost: nonNegativeNumberSchema,
  date_canceled: requiredTextSchema,
});

export const otherCostChargerOperationBodySchema = z.object({
  description: requiredTextSchema,
  price: nonNegativeNumberSchema,
  id_charger_operation: positiveNumberSchema,
  id_person: positiveNumberSchema,
});

export const vehicleBodySchema = z.object({
  name: requiredTextSchema,
  user: requiredTextSchema,
  plate: requiredTextSchema,
  type: requiredTextSchema,
  phone: requiredTextSchema,
  is_active: booleanSchema,
});

export type ChargerOperationBody = z.infer<typeof chargerOperationBodySchema>;
export type OtherCostChargerOperationBody = z.infer<
  typeof otherCostChargerOperationBodySchema
>;
export type VehicleBody = z.infer<typeof vehicleBodySchema>;
