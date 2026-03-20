import { z } from "zod";

const numericId = z.coerce.number().int().positive();

export const looseBodySchema = z.object({}).passthrough();
export const requiredTextSchema = z.string().trim().min(1, "is required");
export const numberSchema = z.coerce.number().finite();
export const nonNegativeNumberSchema = numberSchema.min(0);
export const positiveNumberSchema = numberSchema.positive();
export const booleanSchema = z.coerce.boolean();
export const dateInputSchema = z.coerce.date();
export const nullableTextSchema = z.string().trim().min(1).nullable();
export const nullableDateInputSchema = z.preprocess(
  (value) => (value === null ? null : value),
  z.coerce.date().nullable()
);
export const nullableNumberSchema = z.preprocess(
  (value) => (value === null ? null : value),
  z.coerce.number().finite().nullable()
);

export const idParamSchema = z.object({
  id: numericId,
});

export const idTravelParamSchema = z.object({
  id_travel: numericId,
});

export const destinationParamSchema = z.object({
  destination: z.string().trim().min(1, "is required"),
});

export type IdParams = z.infer<typeof idParamSchema>;
export type IdTravelParams = z.infer<typeof idTravelParamSchema>;
export type DestinationParams = z.infer<typeof destinationParamSchema>;
