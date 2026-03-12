import { Login, Register, Session } from "../domain/usecases";
import { Request, Response } from "express";

export class UserController {
  private loginUseCase: Login;
  private registerUseCase: Register;
  private sessionUseCase: Session;
  constructor() {
    this.loginUseCase = new Login();
    this.registerUseCase = new Register();
    this.sessionUseCase = new Session(this.loginUseCase);
  }
  login = async (req: Request, res: Response) => {
    const {
      user,
      token: access_token,
      refreshToken,
    } = await this.sessionUseCase.execute(req.body);
    try {
      res.status(200).json({
        ...user,
        accessToken: access_token,
        refreshToken,
      });
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };
  register = async (req: Request, res: Response) => {
    try {
      const user = await this.registerUseCase.execute(req.body);
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };

  session = async (req: Request, res: Response) => {
    res.status(200).json(req.body.session);
  };

  logout = async (req: Request, res: Response) => {
    res.status(200).json({ message: "Logged out" });
  };
}
