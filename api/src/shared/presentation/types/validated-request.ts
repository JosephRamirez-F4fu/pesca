import type { Request } from "express";

export type ValidatedRequestData<
  TParams = Record<string, never>,
  TBody = unknown,
  TQuery = Record<string, never>,
> = {
  params: TParams;
  body: TBody;
  query: TQuery;
};

export const getValidated = <
  TParams = Record<string, never>,
  TBody = unknown,
  TQuery = Record<string, never>,
>(
  req: Request
) => req.validated as ValidatedRequestData<TParams, TBody, TQuery>;
