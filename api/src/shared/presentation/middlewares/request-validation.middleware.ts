import type { RequestHandler } from "express";
import { ZodError, type ZodTypeAny } from "zod";
import { badRequest } from "../../domain/errors/http.error";

declare module "express-serve-static-core" {
  interface Request {
    validated?: {
      body?: unknown;
      params?: unknown;
      query?: unknown;
    };
  }
}

const formatZodError = (error: ZodError) =>
  error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "request";
      return `${path}: ${issue.message}`;
    })
    .join("; ");

const validate = (
  selector: "body" | "params" | "query",
  schema: ZodTypeAny
): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse(req[selector]);

    if (!result.success) {
      next(badRequest(formatZodError(result.error)));
      return;
    }

    req[selector] = result.data;
    req.validated = {
      body: req.validated?.body,
      params: req.validated?.params,
      query: req.validated?.query,
      [selector]: result.data,
    };
    next();
  };
};

export const validateBody = (schema: ZodTypeAny) => validate("body", schema);
export const validateParams = (schema: ZodTypeAny) =>
  validate("params", schema);
export const validateQuery = (schema: ZodTypeAny) => validate("query", schema);
