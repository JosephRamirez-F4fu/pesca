import express from "express";
import type { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { Routes } from "./routes";
import cors from "cors";
import {
  requestLoggerMiddleware,
  uncaughtErrorLogger,
} from "./shared/presentation/middlewares/request-logger.middleware";
import {
  conflict,
  HttpError,
  notFound,
  unauthorized,
  badRequest,
} from "./shared/domain/errors/http.error";

const defaultOrigins = [
  "https://app-production-82ec.up.railway.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://host.docker.internal:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
  "http://host.docker.internal:4173",
];

const allowedOrigins = (
  process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim()) ??
  defaultOrigins
).filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  exposedHeaders: ["x-access-token"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Refresh-Token"],
};

const classifyMessageError = (message: string) => {
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("not found") ||
    normalizedMessage.includes("no encontrado")
  ) {
    return notFound(message);
  }

  if (
    normalizedMessage.includes("unauth") ||
    normalizedMessage.includes("token inválido") ||
    normalizedMessage.includes("token invalido")
  ) {
    return unauthorized(message);
  }

  if (
    normalizedMessage.includes("already exists") ||
    normalizedMessage.includes("already exist") ||
    normalizedMessage.includes("duplicate")
  ) {
    return conflict(message);
  }

  if (
    normalizedMessage.includes("required") ||
    normalizedMessage.includes("invalid") ||
    normalizedMessage.includes("does not match") ||
    normalizedMessage.includes("do not match") ||
    normalizedMessage.includes("must be")
  ) {
    return badRequest(message);
  }

  return null;
};

const normalizeError = (error: unknown) => {
  if (error instanceof HttpError) {
    return error;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return conflict("Resource already exists.");
    }

    if (error.code === "P2025") {
      return notFound("Resource not found.");
    }

    return badRequest(error.message);
  }

  if (
    error instanceof Prisma.PrismaClientValidationError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof SyntaxError
  ) {
    return badRequest(error.message);
  }

  if (error instanceof Error) {
    return classifyMessageError(error.message) ?? error;
  }

  return new Error("Internal server error");
};

export class Server {
  private port: number;

  constructor(port: string) {
    this.port = Number(port);
    if (Number.isNaN(this.port)) throw new Error("PORT must be a number");
  }

  run = () => {
    const app = express();
    const routes = new Routes();
    const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
      const normalizedError = normalizeError(error);
      uncaughtErrorLogger(normalizedError, req);

      if (res.headersSent) {
        return;
      }

      const statusCode =
        normalizedError instanceof HttpError ? normalizedError.statusCode : 500;
      const message = normalizedError.message || "Internal server error";

      res.status(statusCode).json({ message });
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(requestLoggerMiddleware);
    app.use(routes.setPublicRoutes());
    app.use(routes.setPrivateRoutes());
    app.use(errorHandler);

    app.listen(this.port, "0.0.0.0", () => {
      console.log(`Server is running on port ${this.port}`);
    });
  };
}
