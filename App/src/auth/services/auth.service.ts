import { LoginDto } from "../domain/dto/login.dto";
import { LoginResDto } from "../domain/dto/login.res.dto";
import { UserSessionDto } from "../domain/dto/user.session.dto";
import { api } from "../../core/api";

export class AuthService {
  private apiUrl = "/auth";

  async login({ code, password }: LoginDto): Promise<LoginResDto> {
    const response = await api.post(`${this.apiUrl}/login`, {
      code,
      password,
    });
    const data: LoginResDto = response.data;
    data.status = response.status;
    return data;
  }

  async getSession(): Promise<LoginResDto> {
    const response = await api.get(`${this.apiUrl}/session`);
    const data: UserSessionDto = response.data;

    return {
      ...data,
      accessToken: "",
      refreshToken: "",
      status: response.status,
    };
  }

  async logout(): Promise<void> {
    await api.post(`${this.apiUrl}/logout`);
  }
}
