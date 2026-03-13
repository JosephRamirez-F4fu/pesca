import { z } from "zod";
import {
  booleanSchema,
  dateInputSchema,
  nonNegativeNumberSchema,
  nullableDateInputSchema,
  positiveNumberSchema,
  requiredTextSchema,
} from "../../shared/presentation/schemas/common.schemas";

export const boatBodySchema = z.object({
  name: requiredTextSchema,
});

export const fishingBodySchema = z.object({
  fish: requiredTextSchema,
  price: nonNegativeNumberSchema,
  boxes: nonNegativeNumberSchema.int(),
  weight: nonNegativeNumberSchema,
  id_travel: positiveNumberSchema.int(),
});

export const otherCostTravelBodySchema = z.object({
  description: requiredTextSchema,
  price: nonNegativeNumberSchema,
  is_added: booleanSchema,
  id_travel: positiveNumberSchema.int(),
});

export const otherCostTravelUpdateBodySchema = z.object({
  description: requiredTextSchema,
  price: nonNegativeNumberSchema,
  is_added: booleanSchema,
});

export const travelCreateBodySchema = z.object({
  oil_charge: nonNegativeNumberSchema.int(),
  oil_charger_price: nonNegativeNumberSchema,
  oil_consume: nonNegativeNumberSchema.int(),
  oil_consume_price: nonNegativeNumberSchema,
  provisions_cost: nonNegativeNumberSchema,
  gas_cylinder_cost: nonNegativeNumberSchema,
  code: requiredTextSchema,
  createdAt: dateInputSchema,
  id_boat: positiveNumberSchema.int(),
});

export const travelUpdateBodySchema = z.object({
  oil_charge: nonNegativeNumberSchema.int(),
  oil_charger_price: nonNegativeNumberSchema,
  oil_consume: nonNegativeNumberSchema.int(),
  oil_consume_price: nonNegativeNumberSchema,
  provisions_cost: nonNegativeNumberSchema,
  gas_cylinder_cost: nonNegativeNumberSchema,
  code: requiredTextSchema,
  createdAt: dateInputSchema,
  is_concluded: booleanSchema,
  oil_remaining: nonNegativeNumberSchema.int(),
  oil_date_canceled: nullableDateInputSchema,
  fishing_date_canceled: nullableDateInputSchema,
  oil_vehicle: nonNegativeNumberSchema.int(),
  oil_vehicle_price: nonNegativeNumberSchema,
  oil_vehicle_date_canceled: nullableDateInputSchema,
});

export type BoatBody = z.infer<typeof boatBodySchema>;
export type FishingBody = z.infer<typeof fishingBodySchema>;
export type OtherCostTravelBody = z.infer<typeof otherCostTravelBodySchema>;
export type OtherCostTravelUpdateBody = z.infer<
  typeof otherCostTravelUpdateBodySchema
>;
export type TravelCreateBody = z.infer<typeof travelCreateBodySchema>;
export type TravelUpdateBody = z.infer<typeof travelUpdateBodySchema>;
