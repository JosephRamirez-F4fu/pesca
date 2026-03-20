export interface LoginResDto {
  name: string;
  code: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  status: number;
}
