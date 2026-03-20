import { UserSignInDto } from "../dtos/user.sigin.dto";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
export class Login {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  async execute(user: UserSignInDto) {
    const userFound = await this.userRepository.findByCode(user.code);
    if (!userFound) {
      throw new Error("User not found");
    }

    if (!userFound.password || !user.password) {
      throw new Error("Both fields are required");
    }

    const passwordMatch = await bcrypt.compare(
      user.password,
      userFound.password
    );
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }
    return {
      name: userFound.name,
      code: userFound.code,
      role: userFound.role.name,
    };
  }
}
