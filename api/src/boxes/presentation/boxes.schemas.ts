import { z } from "zod";
import {
  booleanSchema,
  dateInputSchema,
  idParamSchema,
  nonNegativeNumberSchema,
  positiveNumberSchema,
  requiredTextSchema,
} from "../../shared/presentation/schemas/common.schemas";

export const boxesBodySchema = z.object({
  id_control_place: positiveNumberSchema,
  color: requiredTextSchema,
  name: requiredTextSchema,
  quantity: nonNegativeNumberSchema,
});

export const boxesReturnBodySchema = z.object({
  id_boxes: positiveNumberSchema,
  date: dateInputSchema,
  quantity: nonNegativeNumberSchema,
});

export const controlBoxesBodySchema = z.object({
  code: requiredTextSchema,
  date_arrive: dateInputSchema,
  concluded: booleanSchema,
});

export const controlPlaceBodySchema = z.object({
  id_control_boxes: positiveNumberSchema,
  name: requiredTextSchema,
  date_arrive: dateInputSchema,
  concluded: booleanSchema,
  hasLiquid: booleanSchema,
});

export type IdParams = z.infer<typeof idParamSchema>;
export type BoxesBody = z.infer<typeof boxesBodySchema>;
export type BoxesReturnBody = z.infer<typeof boxesReturnBodySchema>;
export type ControlBoxesBody = z.infer<typeof controlBoxesBodySchema>;
export type ControlPlaceBody = z.infer<typeof controlPlaceBodySchema>;
