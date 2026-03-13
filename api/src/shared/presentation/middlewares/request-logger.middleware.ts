import type { NextFunction, Request, Response } from "express";

type Serializable =
  | string
  | number
  | boolean
  | null
  | Serializable[]
  | { [key: string]: Serializable };

const SENSITIVE_KEYS = new Set([
  "password",
  "refreshtoken",
  "accesstoken",
  "token",
  "authorization",
  "secret",
  "secret_jwt",
]);

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const sanitizeValue = (value: unknown): Serializable | undefined => {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .map((entry) => sanitizeValue(entry))
      .filter((entry): entry is Serializable => entry !== undefined);
  }

  if (isPlainObject(value)) {
    const sanitizedEntries = Object.entries(value)
      .map(([key, entryValue]) => [
        key,
        SENSITIVE_KEYS.has(key.toLowerCase())
          ? "[REDACTED]"
          : sanitizeValue(entryValue),
      ] as const)
      .filter(([, entryValue]) => entryValue !== undefined);

    return Object.fromEntries(sanitizedEntries) as { [key: string]: Serializable };
  }

  return String(value);
};

const getRequestPayload = (req: Request) => {
  const body =
    isPlainObject(req.body) && Object.keys(req.body).length > 0
      ? sanitizeValue(req.body)
      : undefined;
  const params =
    Object.keys(req.params).length > 0 ? sanitizeValue(req.params) : undefined;
  const query =
    Object.keys(req.query).length > 0 ? sanitizeValue(req.query) : undefined;

  return { body, params, query };
};

const log = (
  level: "INFO" | "WARN" | "ERROR",
  message: string,
  metadata: Record<string, unknown>
) => {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...metadata,
  };
  const serialized = JSON.stringify(entry);

  if (level === "ERROR") {
    console.error(serialized);
    return;
  }

  if (level === "WARN") {
    console.warn(serialized);
    return;
  }

  console.info(serialized);
};

export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startedAt = process.hrtime.bigint();
  const payload = getRequestPayload(req);
  let responseBody: unknown;

  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  res.json = ((body: unknown) => {
    responseBody = body;
    return originalJson(body);
  }) as Response["json"];

  res.send = ((body?: unknown) => {
    responseBody = body;
    return originalSend(body);
  }) as Response["send"];

  res.on("finish", () => {
    const durationMs =
      Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    const level =
      res.statusCode >= 500 ? "ERROR" : res.statusCode >= 400 ? "WARN" : "INFO";

    log(level, "HTTP request completed", {
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Number(durationMs.toFixed(2)),
      ip: req.ip,
      request: payload,
      response:
        res.statusCode >= 400 ? sanitizeValue(responseBody) : undefined,
    });
  });

  next();
};

export const uncaughtErrorLogger = (error: unknown, req: Request) => {
  log("ERROR", "Unhandled request error", {
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
    request: getRequestPayload(req),
    error:
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : { message: String(error) },
  });
};
