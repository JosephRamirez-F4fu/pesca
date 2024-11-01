import express, { Router } from "express";
import { MainRouter } from "@/pesca/framework/routes";
import cors from "cors";

export class Server {
  public readonly app = express();
  private port: number;
  private router = Router();

  constructor(port: number) {
    this.port = port;
    this.router = MainRouter.getRouter();
  }

  public start() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(this.router);
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}
