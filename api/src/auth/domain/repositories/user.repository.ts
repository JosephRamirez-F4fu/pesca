import { db } from "../../../core/config/db";
import { User } from "../entities/user";
import { UserRegisterRoleDto } from "../dtos/user.register.dto";
export class UserRepository {
  async save(user: UserRegisterRoleDto) {
    return await db.user.create({
      data: {
        name: user.name,
        code: user.code,
        password: user.password,
        id_role: user.id_role,
      },
    });
  }
  async findByCode(code: string) {
    return await db.user.findUnique({
      where: {
        code,
      },
      include: {
        role: true,
      },
    });
  }
}
