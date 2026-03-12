import express from "express";
import { Routes } from "./routes";
import cors from "cors";

const defaultOrigins = [
  "https://app-production-82ec.up.railway.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
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

export class Server {
  private port: number;

  constructor(port: string) {
    this.port = Number(port);
    if (Number.isNaN(this.port)) throw new Error("PORT must be a number");
  }

  run = () => {
    const app = express();
    const routes = new Routes();

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(routes.setPublicRoutes());
    app.use(routes.setPrivateRoutes());

    app.listen(this.port, "0.0.0.0", () => {
      console.log(`Server is running on port ${this.port}`);
    });
  };
}
