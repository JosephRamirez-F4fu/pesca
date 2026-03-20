import jwt from "jsonwebtoken";
import { ENV } from "../../../core/constants/secret_jwt";

export interface UserRes {
  name: string;
  code: string;
  role: string;
}

export interface IValidateTokenResponse {
  isValid: boolean;
  user: UserRes | null;
}

export class ValidateTokenUseCase {
  async execute(token: string): Promise<IValidateTokenResponse> {
    try {
      const user = jwt.verify(token, ENV.SECRET_JWT) as UserRes & {
        iat?: number;
        exp?: number;
      };
      return {
        isValid: true,
        user: { name: user.name, code: user.code, role: user.role },
      };
    } catch (error) {
      return { isValid: false, user: null };
    }
  }
}
