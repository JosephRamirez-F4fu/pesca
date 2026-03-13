import { z } from "zod";
import {
  booleanSchema,
  dateInputSchema,
  nonNegativeNumberSchema,
  nullableDateInputSchema,
  nullableNumberSchema,
  nullableTextSchema,
  positiveNumberSchema,
  requiredTextSchema,
} from "../../shared/presentation/schemas/common.schemas";

export const routeBodySchema = z.object({
  init: requiredTextSchema,
  end: requiredTextSchema,
  type: requiredTextSchema,
  oil_use: nonNegativeNumberSchema,
});

export const vehicleRouteBodySchema = z.object({
  state: requiredTextSchema,
  id_charge_operation: positiveNumberSchema,
  id_vehicle: positiveNumberSchema,
  is_concluded: requiredTextSchema,
  createdAt: dateInputSchema,
});

export const vehicleRoutesBodySchema = z.object({
  id_vehicle_route: positiveNumberSchema,
  id_route: positiveNumberSchema,
  oil_use: nonNegativeNumberSchema,
  oil_cost: nonNegativeNumberSchema,
  createdAt: dateInputSchema,
  is_concluded: requiredTextSchema,
});

export const vehicleRoutesOilUseBodySchema = z.object({
  id_vehicle_route: positiveNumberSchema,
  description: requiredTextSchema,
  oil_use: nonNegativeNumberSchema,
});

export const vehicleRouteBalanceBodySchema = z.object({
  balance: nonNegativeNumberSchema,
  place: requiredTextSchema,
  createdAt: dateInputSchema,
  updatedAt: dateInputSchema,
  id_vehicle_route: positiveNumberSchema,
});

export const vehicleRouteDetailBodySchema = z.object({
  id_vehicle_route: positiveNumberSchema,
  dateInit: dateInputSchema,
  dateEnd: nullableDateInputSchema,
  taxes_out: nonNegativeNumberSchema,
  taxes_in: nonNegativeNumberSchema,
  point_charge: nullableTextSchema,
  who_destination: nullableTextSchema,
  destiny: nullableTextSchema,
  id_next_route: nullableNumberSchema,
  changeGiven: booleanSchema,
});

export const vehicleRouteMoneyBodySchema = z.object({
  money: nonNegativeNumberSchema,
  givenby: requiredTextSchema,
  type: requiredTextSchema,
  description: requiredTextSchema,
  id_vehicle_route: positiveNumberSchema,
});

export const vehicleRouteOtherCostBodySchema = z.object({
  id_vehicle_route: positiveNumberSchema,
  price: nonNegativeNumberSchema,
  description: requiredTextSchema,
});

export type RouteBody = z.infer<typeof routeBodySchema>;
export type VehicleRouteBody = z.infer<typeof vehicleRouteBodySchema>;
export type VehicleRoutesBody = z.infer<typeof vehicleRoutesBodySchema>;
export type VehicleRoutesOilUseBody = z.infer<
  typeof vehicleRoutesOilUseBodySchema
>;
export type VehicleRouteBalanceBody = z.infer<
  typeof vehicleRouteBalanceBodySchema
>;
export type VehicleRouteDetailBody = z.infer<
  typeof vehicleRouteDetailBodySchema
>;
export type VehicleRouteMoneyBody = z.infer<typeof vehicleRouteMoneyBodySchema>;
export type VehicleRouteOtherCostBody = z.infer<
  typeof vehicleRouteOtherCostBodySchema
>;
