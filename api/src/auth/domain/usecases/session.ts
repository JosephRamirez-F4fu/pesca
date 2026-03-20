import { Login } from "./login";
import jwt from "jsonwebtoken";
import { UserSignInDto } from "../dtos/user.sigin.dto";
import { ENV } from "../../../core/constants/secret_jwt";

export interface UserRes {
  name: string;
  code: string;
  role: string;
}

export class Session {
  constructor(private readonly userLogin: Login) {
    this.userLogin = userLogin;
  }

  private signToken(user: UserRes, expiresIn: "30min" | "7d") {
    return jwt.sign(
      { name: user.name, code: user.code, role: user.role },
      ENV.SECRET_JWT,
      { expiresIn }
    );
  }

  async execute(input: UserSignInDto) {
    const user = await this.userLogin.execute(input);
    const token = this.signToken(user, "30min");
    const refreshToken = this.signToken(user, "7d");

    return { user, token, refreshToken };
  }

  async refreshToken(user: UserRes) {
    const token = this.signToken(user, "7d");
    return { user, token };
  }

  async accessToken(user: UserRes) {
    const token = this.signToken(user, "30min");
    return { user, token };
  }
}
