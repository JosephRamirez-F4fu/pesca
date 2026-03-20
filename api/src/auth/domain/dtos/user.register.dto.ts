export interface UserRegisterDto {
  name: string;
  code: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserRegisterRoleDto {
  name: string;
  code: string;
  password: string;
  id_role: number;
}
